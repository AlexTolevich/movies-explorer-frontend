import './Main.css';
import React        from 'react';
import Header       from '../Header/Header.js';
import Promo        from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs   from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';

function Main({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
    </>
  )
}

export default Main