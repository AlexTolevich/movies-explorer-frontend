import './Main.css';
import React        from 'react';
import Header       from '../Header/Header.js';
import Promo        from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs        from '../Techs/Techs.js';

function Main({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Promo/>
      <AboutProject/>
      <Techs/>
    </>
  )
}

export default Main