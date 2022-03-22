import './SavedMovies.css'
import Header         from '../Header/Header.js';
import SearchForm     from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer         from '../Footer/Footer.js';
import React          from 'react';

function SavedMovies({loggedIn, movies}) {
  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm/>
      <MoviesCardList movies={movies}/>
      {/*<Preloader/>*/}
      <Footer/>
    </div>
  )
}

export default SavedMovies