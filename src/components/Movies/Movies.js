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

  const {
    short,
    filteredMovies,
    inputSearch,
    handleSwitchShort,
    handleInputChange,
    onSubmitSearch,
    updateFilteredMovies
  } = useFindMovie(beatFilmMovies, 'beatFilm', false, getMoviesBeatfilm);

  function getMoviesBeatfilm() {
    if (localStorage.getItem('beatFilmMovies')) {
      setBeatFilmMovies((JSON.parse(localStorage.getItem('beatFilmMovies'))));
    } else {
      setShowPreloader(true);
      moviesApi
        .getMovies()
        .then(data => {
          setBeatFilmMovies(data);
            localStorage.setItem('beatFilmMovies', JSON.stringify(data));
          }
        ).catch(err => console.log(err))
        .finally(() => setShowPreloader(false));
    }
  }

  useEffect(() => {
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
      />
      <Footer/>
    </>
  )
}

export default Movies