import React  from 'react';
import './Main.css';
import Header from '../Header/Header.js';
import Promo  from '../Promo/Promo.js';

function Main({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Promo/>
    </>
  )
}

export default Main