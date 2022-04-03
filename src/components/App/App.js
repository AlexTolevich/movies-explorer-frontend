import React, {useEffect}                     from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import ProtectedRoute                         from '../ProtectedRoute/ProtectedRoute.js';
import Main                                   from '../Main/Main.js';
import Movies                                 from '../Movies/Movies.js';
import SavedMovies                            from '../SavedMovies/SavedMovies.js';
import Profile                                from '../Profile/Profile.js';
import NotFound                               from '../NotFound/NotFound.js';
import Register                               from '../Register/Register.js';
import Login                                  from '../Login/Login.js';
import {mainApi}                              from '../../utils/MainApi.js';
import {CurrentUserContext}                   from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [isServerSearchError, setIsServerSearchError] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getUserData(jwt);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function getUserData(token) {
    mainApi
      .checkToken(token)
      .then((res) => {
        if (res) {
          setCurrentUser({name: res.user.name, email: res.user.email, id: res.user._id});
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка проверки токена: ${err}`);
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('savedMovies')) {
      setSavedMovies((JSON.parse(localStorage.getItem('savedMovies'))));
    } else {
      getSavedMovies();
    }
  }, [])

  function updateSavedMovies(savedMovies) {
    setSavedMovies(savedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }

  function getSavedMovies() {
    setShowPreloader(true);
    mainApi.getMovies()
      .then(data => {
          updateSavedMovies(data);
          setIsServerSearchError(false);
        }
      ).catch(err => {
      setIsServerSearchError(true);
      console.log(err)
    })
      .finally(() => setShowPreloader(false));
  }


  function onMovieSave(movie) {
    const isSaved = savedMovies?.some(i => i.movieId === movie.id);
    if (!isSaved) {
      mainApi.postMovie(movie)
        .then((newMovie) => {
          updateSavedMovies([newMovie, ...savedMovies])
        })
        .catch(err => console.log(err));
    } else {
      const id = savedMovies.find(item => item.movieId === movie.id)._id;
      mainApi.deleteMovie(id)
        .then(() => {
          updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
        })
        .catch(err => console.log(err));
    }
  }

  function onMovieDel(movie) {
    const id = movie._id;
    mainApi.deleteMovie(id)
      .then(() => {
        updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie))
      })
      .catch(err => console.log(err));
  }

  function onLogin(data) {
    mainApi
      .signin(data)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          getUserData(res.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка входа: ${err}`);
      });
  }

  function onRegister(data) {
    mainApi
      .signup(data)
      .then(() => {
        onLogin(data);
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
      })
      .finally(() => {
      });
  }

  function handleUpdateProfile(data) {
    mainApi
      .patchUser(data)
      .then((user) => {
        setCurrentUser({name: user.name, email: user.email, id: user._id});
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных профиля: ${err}`);
      })
  }

  function onSignOut() {
    setLoggedIn(false);
    window.localStorage.clear();
    setSavedMovies([]);
    setCurrentUser({});
    navigate('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>n

          <Route path="/profile"
                 element={
                   <ProtectedRoute
                     component={Profile}
                     loggedIn={loggedIn}
                     onUpdateUser={handleUpdateProfile}
                     onSignOut={onSignOut}
                   />
                 }/>

          <Route path="/movies"
                 element={
                   <ProtectedRoute
                     component={Movies}
                     loggedIn={loggedIn}
                     savedMovies={savedMovies}
                     onMovieSave={onMovieSave}
                   />
                 }/>

          <Route path="/saved-movies"
                 element={
                   <ProtectedRoute
                     component={SavedMovies}
                     loggedIn={loggedIn}
                     movies={savedMovies}
                     onMovieDel={onMovieDel}
                     showPreloader={showPreloader}
                     getMovies={getSavedMovies}
                     isServerSearchError={isServerSearchError}
                   />
                 }/>

          <Route path="/signup"
                 element={!loggedIn
                   ? <Register onRegister={onRegister}/>
                   : <Navigate to="/movies"/>
                 }/>

          <Route path="/signin"
                 element={!loggedIn
                   ? <Login onLogin={onLogin}/>
                   : <Navigate to="/movies"/>
                 }/>

          <Route path="/"
                 element={
                   <Main loggedIn={loggedIn}/>
                 }/>

          <Route path="*"
                 element={
                   <NotFound/>
                 }/>

        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
