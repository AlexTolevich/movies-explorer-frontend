import React, {useEffect} from 'react';
import Header             from '../Header/Header.js';
import Footer             from '../Footer/Footer.js';
import SearchForm         from '../SearchForm/SearchForm.js';
import MoviesCardList     from '../MoviesCardList/MoviesCardList.js';
import {useFindMovie}     from '../../utils/hooks/useFindMovie.js';

function Movies({loggedIn, movies, savedMovies, onMovieSave, showPreloader}) {

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
        showPreloader={showPreloader}
      />
      <Footer/>
    </>
  )
}

export default Movies