import React, {useEffect} from 'react';
import Header             from '../Header/Header.js';
import Footer         from '../Footer/Footer.js';
import SearchForm     from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import {useFindMovie} from '../../utils/hooks/useFindMovie.js';

// import Preloader      from '../Preloader/Preloader.js';

function Movies({loggedIn, movies, savedMovies, onMovieSave}) {

  const {
    short,
    filteredMovies,
    inputSearch,
    handleShort,
    handleChange,
    onSubmitSearch,
    updateFilteredMovies
  } = useFindMovie(movies, 'all', false);

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleChange}
        handleShort={handleShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        short={short}
        movies={filteredMovies}
        savedMovies={savedMovies}
        onMovieSave={onMovieSave}
      />
      {/*<Preloader/>*/}
      <Footer/>
    </>
  )
}

export default Movies