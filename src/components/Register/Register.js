import './Register.css';
import React  from 'react';
import logo   from '../../images/logo.svg';
import {Link} from 'react-router-dom';


function Register({onRegister}) {
  const [name, setName] = React.useState()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email || !password) {
      return
    }
    onRegister(email, password, name);
    console.log(name, email, password)
  }

  return (
    <section className="register">
      <Link to="/">
        <img
          src={logo}
          alt="Логотип"
          className="register__logo"
        />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__label">Имя</label>
        <input
          aria-label="Ваше имя"
          name="name"
          id="register-name"
          className="register__input"
          minLength="2"
          maxLength="30"
          onChange={handleChangeName}
          required
        />
        <span id="name-error" className="register__error"/>

        <label className="register__label">E-mail</label>
        <input
          aria-label="Ваша почта"
          type="Email"
          name="email"
          id="register-email"
          className="register__input"
          minLength="2"
          onChange={handleChangeEmail}
          required
        />
        <span id="email-error" className="register__error"/>

        <label className="register__label">Пароль</label>
        <input
          aria-label="Пароль"
          type="Password"
          name="password"
          id="password"
          className="register__input"
          minLength="6"
          maxLength="200"
          onChange={handleChangePassword}
          required
        />
        <span id="password-error" className="register__error">Что-то пошло не так...</span>
        <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin"> Войти</Link>
      </p>
    </section>
  )
}

export default Register;