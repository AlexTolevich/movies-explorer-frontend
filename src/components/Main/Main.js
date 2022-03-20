import './Main.css';
import React        from 'react';
import Header       from '../Header/Header.js';
import Promo        from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs        from '../Techs/Techs.js';
import AboutMe      from '../AboutMe/AboutMe.js';
import Portfolio    from '../Portfolio/Portfolio.js';

function Main({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </>
  )
}

export default Main