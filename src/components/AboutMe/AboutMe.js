import './AboutMe.css'
import avatar from '../../images/ava-min.jpeg'

function AboutMe() {
  return (
    <div className="about-me" id={'about-me'}>
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__header-line"/>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__name">Александр</h3>
          <p className="about-me__profession">Начинающий Frontend разработчик, 34 года</p>
          <p className="about-me__about">Я родился и живу в г.Красноуфимск. У меня есть жена и дочь. Я начинающий
            frontend разработчик. Учусь писать чистый, лаконичный и понятный код. Хочу получить опыт в разработке
            коммерческих проектов в команде с опытными разработчиками. Стремлюсь развиваться и стать отличным
            специалистом в своей сфере.
          </p>
          <p className="about-me__about"> После того, как прошёл курс по веб-разработке, решил более детально
            разобраться с React, для чего прохожу расширенный курс React-разработчик, где получу углубленные
            теоретические и практические навыки по работе с React, TypeScript, Redux.
          </p>
          <ul className="about-me__social-list">
            <li className="about-me__social-item">
              <a className="about-me__social-link"
                 target="_blank"
                 rel="noreferrer"
                 href="https://t.me/AlexanderKuznetcov">Telegram</a>
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