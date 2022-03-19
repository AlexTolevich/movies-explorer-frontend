import React  from 'react';
import './App.css';
// import Header from '../Header/Header.js';
import Main   from '../Main/Main.js';

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <div className="app">
      <Main loggedIn={false}/>


    </div>
  );
}

export default App;
