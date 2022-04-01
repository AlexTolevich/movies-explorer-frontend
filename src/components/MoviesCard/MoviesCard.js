import './MoviesCard.css'
import {useLocation} from 'react-router-dom';

function MoviesCard({movie, savedMovies, onMovieSave, onMovieDel}) {
  const path = useLocation();
  const duration = `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`;
  const isSaved = savedMovies?.some(i => i.movieId === movie.id)


  const movieLikeButtonClassName = (`movies-card__like-btn ${isSaved && 'movies-card__like-btn_is_saved'}`);

  function handleSaveClick() {
    onMovieSave(movie);
  }

  function handleDelClick() {
    onMovieDel(movie);
  }

  function openTrailer() {
    window.open(movie.trailerLink);
  }


  return (
    <article className="movies-card">
      <img className="movies-card__image"
           src={path.pathname === '/movies' ?
             `https://api.nomoreparties.co${movie.image.url}`
           : movie.image}
           alt={movie.nameRU}
           onClick={openTrailer}
      />
      <div className="movies-card__title-container">
        <div className="movies-card__text">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{duration}</span>
        </div>

        {path.pathname === '/movies' &&
        (<label className="movies-card__like-container">
          <input
            aria-label="Добавить в сохраненные фильмы"
            type="checkbox"
            className="movies-card__like-btn-hide"
            id={movie.id}
            onChange={handleSaveClick}
          />
          <span className={movieLikeButtonClassName}/>
        </label>)
        }

        {path.pathname === '/saved-movies' &&
        (<div className="movies-card__del">
          <button
            aria-label="Удалить фильм из сохраненных"
            type="button"
            className="movies-card__del-btn"
            id={movie.id}
            onClick={handleDelClick}
          />
        </div>)
        }
      </div>
    </article>
  )
}

export default MoviesCard;