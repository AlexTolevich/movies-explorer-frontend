import "./MoviesCardList.css"
import MoviesCard from '../MoviesCard/MoviesCard.js';
import {movies}   from '../../utils/demo_movies.js';

function MoviesCardList(){
  return(
    <div className="movies-card-list" aria-label="Фильмы">
      {movies.map((movie) =>
      <MoviesCard movie={movie}/>)}
    </div>
  )
}

export default MoviesCardList