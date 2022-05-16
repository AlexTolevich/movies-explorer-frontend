import './Register.css';
import React, {useEffect}      from 'react';
import logo                    from '../../images/logo.svg';
import {Link}                  from 'react-router-dom';
import {useFormWithValidation} from '../../utils/hooks/useValidation.js';

function Register({onRegister}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    });
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
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <label className="register__label">Имя</label>
        <input
          aria-label="Ваше имя"
          name="name"
          id="register-name"
          className="register__input"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          required
        />
        <span id="name-error" className={`register__error ${errors.name && 'register__error_visible'}`}>
          {errors.name}
        </span>

        <label className="register__label">E-mail</label>
        <input
          aria-label="Ваша почта"
          type="Email"
          name="email"
          id="register-email"
          className="register__input"
          minLength="2"
          onChange={handleChange}
          required
        />
        <span id="email-error" className={`register__error ${errors.email && 'register__error_visible'}`}>
          {errors.email}
        </span>

        <label className="register__label">Пароль</label>
        <input
          aria-label="Пароль"
          type="Password"
          name="password"
          id="password"
          className="register__input"
          minLength="6"
          maxLength="200"
          onChange={handleChange}
          required
        />
        <span id="password-error" className={`register__error ${errors.password && 'register__error_visible'}`}>
          {errors.password}
        </span>
        <button type="submit"
                className={`register__button ${!isValid && 'register__button_disabled'}`}
                disabled={!isValid}
        >Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin"> Войти</Link>
      </p>
    </section>
  )
}

export default Register;