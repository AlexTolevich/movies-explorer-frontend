import './AboutMe.css'
import avatar from '../../images/ava_vitaliy.png'

function AboutMe() {
  return (
    <div className="about-me" id={"about-me"}>
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__header-line"/>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <ul className="about-me__social-list">
            <li className="about-me__social-item">
              <a className="about-me__social-link"
                 target="_blank"
                 rel="noreferrer"
                 href="https://github.com/AlexTolevich">Facebook</a>
            </li>
            <li className="about-me__social-item">
              <a className="about-me__social-link"
                 target="_blank"
                 rel="noreferrer"
                 href="https://github.com/AlexTolevich">Github</a>
            </li>
          </ul>
        </div>
        <img src={avatar} alt="Аватар" className="about-me__avatar"/>
      </div>
    </div>
  )
}

export default AboutMe;