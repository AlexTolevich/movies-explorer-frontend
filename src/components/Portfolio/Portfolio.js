import './Portfolio.css'

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__link-list">
        <li className="portfolio__link-item">
          <a href="https://alextolevich.github.io/how-to-learn/" className="portfolio__link">
            <p className="portfolio__text-link">Статичный сайт</p>
            <p className="portfolio__arrow-link">↗</p>
          </a>
        </li>
        <li className="portfolio__link-item">
          <a href="https://alextolevich.github.io/russian-travel/" className="portfolio__link">
            <p className="portfolio__text-link">Адаптивный сайт</p>
            <p className="portfolio__arrow-link">↗</p>
          </a>
        </li>
        <li className="portfolio__link-item">
          <a href="https://mestechko.nomoredomains.xyz/" className="portfolio__link">
            <p className="portfolio__text-link">Одностраничное приложение</p>
            <p className="portfolio__arrow-link">↗</p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;