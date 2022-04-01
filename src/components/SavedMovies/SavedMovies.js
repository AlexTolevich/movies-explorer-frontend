import Header             from '../Header/Header.js';
import SearchForm         from '../SearchForm/SearchForm.js';
import MoviesCardList     from '../MoviesCardList/MoviesCardList.js';
import Footer             from '../Footer/Footer.js';
import React, {useEffect} from 'react';
import {useFindMovie}     from '../../utils/hooks/useFindMovie.js';

function SavedMovies({loggedIn, movies, onMovieDel}) {
  const {
    short,
    setShort,
    filteredMovies,
    updateFilteredMovies,
    inputSearch,
    setInputSearch,
    handleShort,
    handleChange,
    onSubmitSearch
  } = useFindMovie(movies, 'save', true);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      updateFilteredMovies(movies);
      setShort(false);
      setInputSearch('');
    }
  }, [movies]);

  return (
    <div>
      <Header loggedIn={loggedIn}/>
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleChange}
        handleShort={handleShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        movies={filteredMovies}
        short={short}
        onMovieDel={onMovieDel}
      />
      {/*<Preloader/>*/}
      <Footer/>
    </div>
  )
}

export default SavedMovies