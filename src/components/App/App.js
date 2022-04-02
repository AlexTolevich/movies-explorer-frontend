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
import {moviesApi}                            from '../../utils/MoviesApi.js';
import {mainApi}                              from '../../utils/MainApi.js';
import {CurrentUserContext}                   from '../../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверяем токен пользователя
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({name: res.user.name, email: res.user.email, id: res.user._id})
            setLoggedIn(true);
            console.log(res)
          }
        })
        .catch((err) => {
          console.log(`Ошибка проверки токена: ${err}`);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  /**
   * Функция загрузки данных фильмов посредством методов API с сохранением и извлечением данных в LocalStorage
   * @param setState - функция обновления состояния стейт переменной
   * @param localStorageKey - ключ для сохранения/извлечения данных в LocalStorage
   * @param apiMethod - метод API для загрузки данных
   */
  const getMovies = (setState, localStorageKey, apiMethod) => {
    if (localStorage.getItem(localStorageKey)) {
      setState((JSON.parse(localStorage.getItem(localStorageKey))));
    } else {
      apiMethod()
        .then(data => {
            setState(data);
            localStorage.setItem(localStorageKey, JSON.stringify(data));
          }
        ).catch(err => console.log(err));
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getMovies(setMovies, 'movies', moviesApi.getMovies)
      getMovies(setSavedMovies, 'savedMovies', mainApi.getMovies);
    }
  }, [loggedIn, currentUser]);

  // useEffect(() => {
  //   getMovies(setSavedMovies, 'savedMovies', mainApi.getMovies);
  // }, [loggedIn]);

  // useEffect(() => {
  //   localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  // }, [savedMovies])

  function onMovieSave(movie) {
    const isSaved = savedMovies?.some(i => i.movieId === movie.id);

    if (!isSaved) {
      mainApi.postMovie(movie)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies])
        })
        .catch(err => console.log(err));
    } else {
      const id = savedMovies.find(item => item.movieId === movie.id)._id;
      mainApi.deleteMovie(id)
        .then(
          setSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie))
        )
        .catch(err => console.log(err));
    }
  }

  function onMovieDel(movie) {
    const id = movie._id;
    mainApi.deleteMovie(id)
      .then(
        setSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie))
      )
      .catch(err => console.log(err));
  }

  function onLogin(email, password) {
    mainApi
      .signin(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка входа: ${err}`);
      });
  }

  function onRegister(email, password, name) {
    mainApi
      .signup(email, password, name)
      .then(res => {
        if (res._id) {
          navigate('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации: ${err}`);
      })
      .finally(() => {
      });
  }

  console.log(loggedIn)

  function handleUpdateProfile(name, email) {
    mainApi
      .patchUser(name, email)
      .then((user) => {
        setCurrentUser({name: user.user.name, email: user.user.email, id: user.user._id});
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных профиля: ${err}`);
      })
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
                   />
                 }/>

          <Route path="/movies"
                 element={
                   <ProtectedRoute
                     component={Movies}
                     loggedIn={loggedIn}
                     movies={movies}
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
