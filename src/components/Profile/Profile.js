import './Profile.css'
import React, {useEffect}   from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import {Link} from 'react-router-dom';

function Profile({loggedIn, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email) {
      return;
    }
    onUpdateUser(name, email);
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <div className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              aria-label="Ваше имя"
              name="profile-name"
              id="profile-name"
              className="profile__input"
              minLength="2"
              onChange={handleChangeName}
              required
            />
          </div>
          <span id="name-error" className="profile__error"/>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              aria-label="Ваша почта"
              type="Email"
              name="email"
              id="email"
              className="profile__input"
              minLength="6"
              onChange={handleChangeEmail}
              required
            />
          </div>
          <span id="email-error" className="profile__error"/>
          <button type="submit" className="profile__edit-btn">Редактировать</button>
        </form>
        <Link className="profile__signout" to="/signin">Выйти из аккаунта</Link>
      </div>
    </>
  )
}

export default Profile