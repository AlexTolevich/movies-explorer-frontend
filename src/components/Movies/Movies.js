import React, {useEffect} from 'react';
import Header             from '../Header/Header.js';
import Footer             from '../Footer/Footer.js';
import SearchForm         from '../SearchForm/SearchForm.js';
import MoviesCardList     from '../MoviesCardList/MoviesCardList.js';
import {useFindMovie}     from '../../utils/hooks/useFindMovie.js';
import {mainApi}          from '../../utils/MainApi.js';
import {moviesApi}        from '../../utils/MoviesApi.js';

function Movies({loggedIn, savedMovies, onMovieSave}) {
  const [beatFilmMovies, setBeatFilmMovies] = React.useState([]);
  const [showPreloader, setShowPreloader] = React.useState(false);
  const [isServerSearchError, setIsServerSearchError] = React.useState(false);

  const {
    short,
    filteredMovies,
    inputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    updateFilteredMovies,
    filterMovies,
  } = useFindMovie(beatFilmMovies, 'beatFilm', false, getMoviesBeatfilm);

  function getMoviesBeatfilm() {
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
      filterMovies(JSON.parse(localStorage.getItem('beatFilmMovies')), inputSearch, short)
    } else {
      setShowPreloader(true);
      moviesApi
        .getMovies()
        .then(data => {
            setBeatFilmMovies(data);
            localStorage.setItem('beatFilmMovies', JSON.stringify(data));
            filterMovies(data, inputSearch, short);
            setIsServerSearchError(false);
          }
        ).catch(err => {
        setIsServerSearchError(true);
        console.log(err)
      })
        .finally(() => setShowPreloader(false));
    }
  }

  useEffect(() => {
    setIsServerSearchError(false);
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies((JSON.parse(localStorage.getItem('beatFilmMovies'))));
    }
  }, [])

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm
        onSubmitSearch={onSubmitSearch}
        short={short}
        handleChange={handleInputChange}
        handleShort={handleSwitchShort}
        inputSearch={inputSearch}
      />
      <MoviesCardList
        short={short}
        movies={filteredMovies}
        savedMovies={savedMovies}
        onMovieSave={onMovieSave}
        showPreloader={showPreloader}
        isServerSearchError={isServerSearchError}
      />
      <Footer/>
    </>
  )
}

export default Movies