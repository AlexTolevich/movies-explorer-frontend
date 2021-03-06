import Header       from '../Header/Header.js';
import Promo        from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs        from '../Techs/Techs.js';
import AboutMe      from '../AboutMe/AboutMe.js';
import Portfolio    from '../Portfolio/Portfolio.js';
import Footer       from '../Footer/Footer.js';

function Main({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </>
  )
}

export default Main