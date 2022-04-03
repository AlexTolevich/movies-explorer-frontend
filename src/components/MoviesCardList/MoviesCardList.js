import './MoviesCardList.css'
import MoviesCard          from '../MoviesCard/MoviesCard.js';
import {useLocation}       from 'react-router-dom';
import {useOutMovDepWidth} from '../../utils/hooks/useOutMovDepWidth.js'
import Preloader           from '../Preloader/Preloader.js';

function MoviesCardList({movies, savedMovies, onMovieSave, onMovieDel, showPreloader}) {
  const path = useLocation();
  const {
    finalArrMovies,
    handleMoreMovies,
  } = useOutMovDepWidth(movies)

  return (
    <>
      <Preloader showPreloader={showPreloader}/>
      <section className="movies-card-list" aria-label="Фильмы">
        {finalArrMovies
          .map((movie) =>
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              savedMovies={savedMovies}
              onMovieSave={onMovieSave}
              onMovieDel={onMovieDel}/>)}
      </section>
      <section className="movies-card-list__more">
        {Boolean(path.pathname === '/movies' & (movies.length > finalArrMovies.length)) &&
        <button
          className="movies-card-list__more-btn"
          onClick={handleMoreMovies}
        >Ещё</button>
        }
      </section>
    </>
  )
}

export default MoviesCardList