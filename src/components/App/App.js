import React, {useEffect}                     from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
import Main                                   from '../Main/Main.js';
import Movies                                 from '../Movies/Movies.js';
import SavedMovies                            from '../SavedMovies/SavedMovies.js';
import Profile                                from '../Profile/Profile.js';
import {movies}                               from '../../utils/demo_movies.js';
import {savedMovies}                          from '../../utils/saved_movies.js'
import NotFound                               from '../NotFound/NotFound.js';
import Register                               from '../Register/Register.js';
import Login                                  from '../Login/Login.js';
import {moviesApi}                            from '../../utils/MoviesApi.js';
import {mainApi}                              from '../../utils/MainApi.js';

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(true);

  useEffect(() => {
    moviesApi.getMovies().then(
      res => {
        console.log(res);
      }
    ).catch(err => console.log(err));
  }, []);

  return (
    <div className="app">
      <Routes>n

        <Route path="/profile"
               element={
                 <Profile
                   loggedIn={true}
                   userName={'Виталий'}
                 />
               }/>

        <Route path="/movies"
               element={
                 <Movies loggedIn={true} movies={movies}/>
               }/>

        <Route path="/saved-movies"
               element={
                 <SavedMovies loggedIn={true} movies={savedMovies}/>
               }/>

        <Route path="/signup"
               element={
                 <Register userName={'Виталий'}/>
               }/>

        <Route path="/signin"
               element={
                 <Login/>
               }/>

        <Route path="/"
               element={
                 <Main loggedIn={false}/>
               }/>

        <Route path="*"
               element={
                 <NotFound/>
               }/>

      </Routes>
    </div>
  );
}

export default App;
