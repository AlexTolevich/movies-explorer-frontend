import {Link} from 'react-router-dom';
import './NavTab.css'

function NavTab() {
  return (
    <nav>
      <ul className="nav-tab">
        <li className="nav-tab__link-item">
          <Link to="#about-project" className="nav-tab__link">О проекте</Link>
        </li>
        <li className="nav-tab__link-item">
          <Link to="#techs" className="nav-tab__link">Технологии</Link>
        </li>
        <li className="nav-tab__link-item">
          <Link to="#about-me" className="nav-tab__link">Студент</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavTab