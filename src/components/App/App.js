import React                                  from 'react';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header.js';
import Main                                   from '../Main/Main.js';
import Movies                                 from '../Movies/Movies.js';
import SavedMovies                            from '../SavedMovies/SavedMovies.js';
import {movies}                               from '../../utils/demo_movies.js';
import {savedMovies}                          from '../../utils/saved_movies.js'

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <div className="app">
      <Routes>

        <Route path="/movies"
               element={
                 <Movies loggedIn={true} movies={movies}/>
               }
        />
        <Route path="/saved-movies"
               element={
                 <SavedMovies loggedIn={true} movies={savedMovies}/>
               }
        />

        <Route path="/"
               element={
                 <Main loggedIn={false}/>
               }
        />

        <Route path="*" element={<Navigate to="/"/>}/>

      </Routes>
    </div>
  );
}

export default App;
