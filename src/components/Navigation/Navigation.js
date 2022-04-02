import {Link, useLocation} from 'react-router-dom';
import './Navigation.css'

function Navigation({loggedIn}) {
  const path = useLocation();
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
          <div className="header__desktop-menu">
            <Link to="/movies" className={`header__link header__link_is_logged-in
              ${path.pathname === '/movies' && 'header__link_is_active'}`}>Фильмы</Link>
          <Link to="/saved-movies" className={`header__link header__link_is_logged-in
              ${path.pathname === '/saved-movies' && 'header__link_is_active'}`}>Сохранённые фильмы</Link>
          <Link to="/profile" className="header__account-link">
            <div className="header__account-logo"/>
            <p className="header__account-text">Аккаунт</p>
          </Link>
          </div>
        <div className="header__hamburger-menu">
        <input id="menu__toggle" type="checkbox"/>
        <label className="header__menu-btn" htmlFor="menu__toggle">
        <span/>
        </label>

        <ul className="header__menu-container">
        <div className="header__link-container">
        <li className="header__link-item">
        <Link to="/" className={`header__link header__link_is_logged-in
              ${path.pathname === '/' && 'header__link_is_active'}`}>
        Главная
        </Link>
        </li>
        <li className="header__link-item">
        <Link to="/movies" className={`header__link header__link_is_logged-in
              ${path.pathname === '/movies' && 'header__link_is_active'}`}>
        Фильмы
        </Link>
        </li>
        <li className="header__link-item">
        <Link to="/saved-movies" className={`header__link header__link_is_logged-in
              ${path.pathname === '/saved-movies' && 'header__link_is_active'}`}>
        Сохранённые фильмы
        </Link>
        </li>
        </div>
        <li>
        <Link to="/profile" className="header__account-link">
        <div className="header__account-logo"/>
        <p className="header__account-text">Аккаунт</p>
        </Link>
        </li>
        </ul>
        </div>
        </>
        )
      }
    </nav>
  )
}

export default Navigation