import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__text-container">
        <p className="footer__copyright">&copy; 2022</p>
        <nav>
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a href="https://praktikum.yandex.ru/profile/web/"
                 target="_blank"
                 rel="noreferrer"
                 className="footer__link">Яндекс.Практикум</a>
            </li>
            <li className="footer__nav-item">
              <a href="https://github.com/"
                 target="_blank"
                 rel="noreferrer"
                 className="footer__link">Github</a>
            </li>
            <li className="footer__nav-item">
              <a href="https://telegram.org/"
                 target="_blank"
                 rel="noreferrer"
                 className="footer__link">Telegram</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Footer