import logo       from '../../images/logo.svg';
import {Link}     from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import './Header.css';

function Header({loggedIn}) {
  return (
    <header className="header">
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className="header__logo"
        />
      </Link>
      <Navigation loggedIn={loggedIn}/>
    </header>
  )
}

export default Header