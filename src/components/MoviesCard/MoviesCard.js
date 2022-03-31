import './MoviesCard.css'
import {useLocation} from "react-router-dom";

function MoviesCard({movie}) {
  const duration = `${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`;
  const path = useLocation();

  return (
    <article className="movies-card">
      <img className="movies-card__image"
           src={`https://api.nomoreparties.co${movie.image.url}`}
           alt={movie.nameRU}/>
      <div className="movies-card__title-container">
        <div className="movies-card__text">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">{duration}</span>
        </div>

        {path.pathname === "/movies" &&
          (<label className="movies-card__like-container">
            <input
              aria-label="Добавить в сохраненные фильмы"
              type="checkbox"
              className="movies-card__like-btn-hide"
              id={movie.id}
              // onClick={handleLikeClick}
            />
            <span className="movies-card__like-btn"/>
          </label>)
        }

        {path.pathname === "/saved-movies" &&
        (<div className="movies-card__del">
          <button
            aria-label="Удалить фильм из сохраненных"
            type="button"
            className="movies-card__del-btn"
            id={movie.id}
            // onClick={handleLikeClick}
          />
        </div>)
        }
      </div>
    </article>
  )
}

export default MoviesCard;