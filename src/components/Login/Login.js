import './Login.css';
import React from 'react';
import logo  from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function Login({onLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <section className="login">
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className="login__logo"
        />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">E-mail</label>
        <input
          aria-label="Ваша почта"
          type="Email"
          name="email"
          id="login-email"
          className="login__input"
          placeholder="pochta@yandex.ru|"
          minLength="2"
          onChange={handleChangeEmail}
          value={email}
          required
        />
        <span id="email-error" className="login__error"/>

        <label className="login__label">Пароль</label>
        <input
          aria-label="Пароль"
          type="Password"
          name="password"
          id="password"
          className="login__input"
          placeholder="Пароль"
          minLength="6"
          maxLength="200"
          onChange={handleChangePassword}
          value={password}
          required
        />
        <span id="password-error" className="login__error login__error_visible"/>
        <button type="submit" className="login__button">Войти</button>
      </form>
      <p className="login__text">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup"> Регистрация</Link>
      </p>
    </section>
  )
}

export default Login;