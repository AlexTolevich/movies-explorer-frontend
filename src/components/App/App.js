import React  from 'react';
import './App.css';
// import Header from '../Header/Header.js';
import Main   from '../Main/Main.js';
import Movies from '../Movies/Movies.js';

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <div className="app">
      <Movies loggedIn={true}/>
      <Main loggedIn={false}/>


    </div>
  );
}

export default App;
