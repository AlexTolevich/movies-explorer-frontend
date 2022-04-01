import './MoviesCardList.css'
import MoviesCard          from '../MoviesCard/MoviesCard.js';
import {useLocation}       from 'react-router-dom';
import {useOutMovDepWidth} from '../../utils/hooks/useOutMovDepWidth.js'

function MoviesCardList({movies, short}) {
  const path = useLocation();
  const {
    finalArrMovies,
    handleMoreMovies
  } = useOutMovDepWidth(movies)

  return (
    <>
      <section className="movies-card-list" aria-label="Фильмы">
        {finalArrMovies
          .map((movie) =>
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}/>)}
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