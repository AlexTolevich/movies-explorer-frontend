import React, {useEffect}                                  from 'react';
import {Route, Routes, Navigate, useNavigate, useLocation} from 'react-router-dom';
import './App.css';
import ProtectedRoute                                      from '../ProtectedRoute/ProtectedRoute.js';
import Main                                                from '../Main/Main.js';
import Movies                                              from '../Movies/Movies.js';
import SavedMovies                                         from '../SavedMovies/SavedMovies.js';
import Profile                                             from '../Profile/Profile.js';
import NotFound                                            from '../NotFound/NotFound.js';
import Register                                            from '../Register/Register.js';
import Login                                               from '../Login/Login.js';
import {mainApi}                                           from '../../utils/MainApi.js';
import {CurrentUserContext}                                from '../../contexts/CurrentUserContext.js';
import InfoTooltip                                         from '../InfoToolTip/InfoToolTip.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [isServerSearchError, setIsServerSearchError] = React.useState(false);
  const [isInfoTooltipStatus, setIsInfoTooltipStatus] = React.useState(true);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [tooltipText, setTooltipText] = React.useState('');

  const navigate = useNavigate();
  const path = useLocation();

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
        setTooltipText('Ошибка проверки токена');
        setIsInfoTooltipStatus(false);
        setIsInfoTooltipOpened(true);
        console.log(`Ошибка проверки токена: ${err}`);
        setLoggedIn(false);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('savedMovies')) {
        setSavedMovies((JSON.parse(localStorage.getItem('savedMovies'))));
      } else {
        getSavedMovies();
      }
    }
  }, [loggedIn])

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
      if (err === 404) {
        if (path.pathname === '/saved-movies') {
          setTooltipText('Сохраненных фильмов на сервере не найдено');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
        }
        console.log(err)
      } else {
        setTooltipText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и\n' +
          '        попробуйте ещё раз.');
        setIsInfoTooltipStatus(false);
        setIsInfoTooltipOpened(true);
        setIsServerSearchError(true);
        console.log(err);
      }
    })
      .finally(() => setShowPreloader(false));
  }


  function onMovieSave(movie) {
    const isSaved = savedMovies?.some(i => i.movieId === movie.id);
    if (!isSaved) {
      mainApi.postMovie(movie)
        .then((newMovie) => {
          updateSavedMovies([newMovie, ...savedMovies])
          setTooltipText('Фильм успешно добавлен в сохраненные.');
          setIsInfoTooltipStatus(true);
          setIsInfoTooltipOpened(true);
        })
        .catch((err) => {
          if (err === 400) {
            setTooltipText('Переданы некорректные данные при создании фильма.');
            setIsInfoTooltipStatus(false);
            setIsInfoTooltipOpened(true);
            console.log(err);
          } else {
            setTooltipText('Произошла ошибка на сервере при создании фильма.');
            setIsInfoTooltipStatus(false);
            setIsInfoTooltipOpened(true);
            console.log(err);
          }
        });
    } else {
      const id = savedMovies.find(item => item.movieId === movie.id)._id;
      mainApi.deleteMovie(id)
        .then(() => {
          updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
          setTooltipText('Фильм успешно удален из списка сохраненных.');
          setIsInfoTooltipStatus(true);
          setIsInfoTooltipOpened(true);
        })
        .catch((err) => {
          if (err === 404) {
            setTooltipText('Фильм с указанным id не найден, удаление не возможно.');
            setIsInfoTooltipStatus(false);
            setIsInfoTooltipOpened(true);
            console.log(err);
          } else if (err === 403) {
            setTooltipText('Отсутствуют права на удаление фильма.');
            setIsInfoTooltipStatus(false);
            setIsInfoTooltipOpened(true);
            console.log(err);
          } else if (err === 400) {
            setTooltipText('Переданы некорректные данные при удалении фильма.');
            setIsInfoTooltipStatus(false);
            setIsInfoTooltipOpened(true);
            console.log(err);
          } else {
            setTooltipText('Произошла ошибка на сервере при создании фильма.');
            setIsInfoTooltipStatus(false);
            setIsInfoTooltipOpened(true);
            console.log(err);
          }
        })
    }
  }

  function onMovieDel(movie) {
    const id = movie._id;
    mainApi.deleteMovie(id)
      .then(() => {
        updateSavedMovies(savedMovies.filter(movie => movie._id === id ? null : movie));
        setTooltipText('Фильм успешно удален из списка сохраненных.');
        setIsInfoTooltipStatus(true);
        setIsInfoTooltipOpened(true);
      })
      .catch((err) => {
        if (err === 404) {
          setTooltipText('Фильм с указанным id не найден, удаление не возможно.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else if (err === 403) {
          setTooltipText('Отсутствуют права на удаление фильма.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else if (err === 400) {
          setTooltipText('Переданы некорректные данные при удалении фильма.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else {
          setTooltipText('Произошла ошибка на сервере при создании фильма.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        }
      })
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
          setTooltipText('Вход произведен успешно.');
          setIsInfoTooltipStatus(true);
          setIsInfoTooltipOpened(true);
        }
      })
      .catch((err) => {
        if (err === 401) {
          setTooltipText('Неправильные почта или пароль.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else if (err === 400) {
          setTooltipText('Введены не корректные данные.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else {
          setTooltipText('Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и\n' +
            '        попробуйте ещё раз.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        }
      })
  }

  function onRegister(data) {
    mainApi
      .signup(data)
      .then(() => {
        setTooltipText('Регистрация произведена успешно.');
        setIsInfoTooltipStatus(true);
        setIsInfoTooltipOpened(true);
        onLogin(data);
      })
      .catch((err) => {
        if (err === 400) {
          setTooltipText('Переданы некорректные данные при создании пользователя.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else if (err === 409) {
          setTooltipText('Пользователь с указанным email уже зарегистрирован.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else {
          setTooltipText('Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и\n' +
            '        попробуйте ещё раз.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        }
      })
  }

  function handleUpdateProfile(data) {
    mainApi
      .patchUser(data)
      .then((user) => {
        setCurrentUser({name: user.name, email: user.email, id: user._id});
        setTooltipText('Изменение данных профиля произведены успешно.');
        setIsInfoTooltipStatus(true);
        setIsInfoTooltipOpened(true);
      })
      .catch((err) => {
        if (err === 404) {
          setTooltipText('Пользователь с указанным id не найден.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else if (err === 400) {
          setTooltipText('Переданы некорректные данные при обновлении профиля.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        } else {
          setTooltipText('Произошла ошибка на сервере. Возможно, проблема с соединением или сервер недоступен. Подождите немного и\n' +
            '        попробуйте ещё раз.');
          setIsInfoTooltipStatus(false);
          setIsInfoTooltipOpened(true);
          console.log(err);
        }
      })
  }

  function onSignOut() {
    setLoggedIn(false);
    window.localStorage.clear();
    setSavedMovies([]);
    setCurrentUser({});
    navigate('/');
    setTooltipText('Вы успешно вышли из системы');
    setIsInfoTooltipStatus(true);
    setIsInfoTooltipOpened(true);
  }

  function closeAllPopups() {
    setTooltipText('');
    setIsInfoTooltipStatus(true);
    setIsInfoTooltipOpened(false)
  }

  function closeOverlayClick(event) {
    if (event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>

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
        <InfoTooltip
          isInfoTooltipStatus={isInfoTooltipStatus}
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
          onCloseOverlayClick={closeOverlayClick}
          tooltipText={tooltipText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
