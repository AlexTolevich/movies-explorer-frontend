import {Link} from 'react-router-dom';
import './Navigation.css'

function Navigation({loggedIn}) {
  return (
    <nav className="navigation">
      {!loggedIn ?
        (<>
          <Link to="/signup" className="header__link">Регистрация</Link>
          <Link to="/signin" className="header__button">
            <p className="header__button-text">Войти</p>
          </Link>
        </>) : (
          <>
            <Link to="/movies" className="header__link header__link_is_logged-in header__link_is_active">Фильмы</Link>
            <Link to="/saved-movies" className="header__link header__link_is_logged-in">Сохраненные фильмы</Link>
            <Link to="/profile" className="header__account-link">
              <div className="header__account-logo"/>
              <p className="header__account-text">Аккаунт</p>
            </Link>
          </>
        )
      }
    </nav>
  )
}

export default Navigation