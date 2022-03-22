import './Register.css';
import logo   from '../../images/logo.svg';
import {Link} from 'react-router-dom';

function Register({userName}) {
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
      <form className="register__form">
        <label className="register__label">Имя</label>
        <input
          aria-label="Ваше имя"
          name="name"
          id="register-name"
          className="register__input"
          placeholder={userName}
          minLength="2"
          // onChange={handleChangeEmail}
          // value={email}
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
          placeholder="pochta@yandex.ru|"
          minLength="2"
          // onChange={handleChangeEmail}
          // value={email}
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
          placeholder="Пароль"
          minLength="6"
          maxLength="200"
          // onChange={handleChangePassword}
          // value={password}
          required
        />
        <span id="password-error" className="register__error register__error_visible">Что-то пошло не так...</span>
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