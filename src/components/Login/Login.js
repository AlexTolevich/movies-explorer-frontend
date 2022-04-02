import './Login.css';
import React, {useEffect}      from 'react';
import logo                    from '../../images/logo.svg';
import {Link}                  from 'react-router-dom';
import {useFormWithValidation} from '../../utils/hooks/useValidation.js';

function Login({onLogin}) {
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({
      email: values.email,
      password: values.password
    });
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
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <label className="login__label">E-mail</label>
        <input
          aria-label="Ваша почта"
          type="Email"
          name="email"
          id="login-email"
          className="login__input"
          placeholder="pochta@yandex.ru|"
          minLength="2"
          onChange={handleChange}
          required
        />
        <span id="email-error" className={`login__error ${errors.email && 'login__error_visible'}`}>
          {errors.email}
        </span>

        <label className="login__label">Пароль</label>
        <input
          aria-label="Пароль"
          type="Password"
          name="password"
          id="login_password"
          className="login__input"
          placeholder="Пароль"
          minLength="6"
          maxLength="200"
          onChange={handleChange}
          required
        />
        <span id="password-error" className={`login__error ${errors.password && 'login__error_visible'}`}>
          {errors.password}
        </span>
        <button type="submit"
                className={`login__button ${!isValid && 'login__button_disabled'}`}
                disabled={!isValid}
        >Войти
        </button>
      </form>
      <p className="login__text">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup"> Регистрация</Link>
      </p>
    </section>
  )
}

export default Login;