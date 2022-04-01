import Header             from '../Header/Header.js';
import SearchForm         from '../SearchForm/SearchForm.js';
import MoviesCardList     from '../MoviesCardList/MoviesCardList.js';
import Footer             from '../Footer/Footer.js';
import React, {useEffect} from 'react';
import {useFindMovie}     from '../../utils/hooks/useFindMovie.js';

function SavedMovies({loggedIn, movies}) {
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
  } = useFindMovie(movies, 'save');

  useEffect(() => {
    if (filteredMovies.length === 0) {
      updateFilteredMovies(movies);
      setShort(false);
      setInputSearch('');
    }
  }, [movies]);

  // useEffect(() => {
  //   if (inputSearch.length === 0) {
  //     updateFilteredMovies(movies);
  //   }
  // }, [inputSearch]);


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
      />
      {/*<Preloader/>*/}
      <Footer/>
    </div>
  )
}

export default SavedMovies