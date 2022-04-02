import React      from 'react';
import {Navigate} from 'react-router-dom';
import Header     from '../Header/Header.js';
import Preloader  from '../Preloader/Preloader.js';

function ProtectedRoute({component: Component, ...props}) {

  if (props.loggedIn === null) {
    return <>
      <Header/>
      <Preloader/>
    </>

  }

  if (props.loggedIn !== true) {
    return <Navigate to="/"/>
  }

  return <Component {...props} />
}

export default ProtectedRoute;