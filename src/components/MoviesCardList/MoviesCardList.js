import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.js';
import {movies}   from '../../utils/demo_movies.js';

function MoviesCardList() {
  return (
    <>
      <section className="movies-card-list" aria-label="Фильмы">
        {movies.map((movie) =>
          <MoviesCard movie={movie}/>)}
      </section>
      <section className="movies-card-list__more">
        <button className="movies-card-list__more-btn">Ещё</button>
      </section>
    </>
  )
}

export default MoviesCardList