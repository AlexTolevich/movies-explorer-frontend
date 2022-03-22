import './Profile.css'
import Header from '../Header/Header.js';
import {Link} from 'react-router-dom';

function Profile({loggedIn, userName}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <div className="profile">
        <h2 className="profile__header">Привет, {userName}!</h2>
        <form className="profile__form">
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              aria-label="Ваше имя"
              name="profile-name"
              id="profile-name"
              className="profile__input"
              placeholder={userName}
              minLength="2"
              // value={email}
              // onChange={handleChangeEmail}
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
              placeholder="pochta@yandex.ru"
              minLength="6"
              // value={email}
              // onChange={handleChangeEmail}
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