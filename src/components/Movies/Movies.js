import React      from 'react';
import Header     from '../Header/Header.js';
import Footer     from '../Footer/Footer.js';
import SearchForm     from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader      from '../Preloader/Preloader.js';

function Movies({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SearchForm/>
      <MoviesCardList/>
      {/*<Preloader/>*/}
      <Footer/>
    </>
  )
}

export default Movies