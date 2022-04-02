import './Profile.css'
import React, {useEffect}      from 'react';
import {CurrentUserContext}    from '../../contexts/CurrentUserContext.js';
import Header                  from '../Header/Header.js';
import {useFormWithValidation} from '../../utils/hooks/useValidation.js';

function Profile({loggedIn, onUpdateUser, onSignOut}) {
  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email
    });
  }

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <div className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              aria-label="Ваше имя"
              name="name"
              id="profile-name"
              className="profile__input"
              minLength="2"
              onChange={handleChange}
              required
            />
          </div>
          <span id="name-error" className={`profile__error ${errors.name && 'profile__error_visible'}`}>
          {errors.name}
        </span>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              aria-label="Ваша почта"
              type="Email"
              name="email"
              id="email"
              className="profile__input"
              minLength="6"
              onChange={handleChange}
              required
            />
          </div>
          <span id="email-error" className={`profile__error ${errors.email && 'profile__error_visible'}`}>
          {errors.email}
        </span>
          <button type="submit"
                  className={`profile__edit-btn ${!isValid && 'profile__edit-btn_disabled'}`}
                  disabled={!isValid}
          >Редактировать
          </button>
        </form>
        <button className="profile__signout" onClick={onSignOut}>Выйти из аккаунта</button>
      </div>
    </>
  )
}

export default Profile