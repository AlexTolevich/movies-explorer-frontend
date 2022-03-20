import './Techs.css'

function Techs() {
  return (
    <div className="techs">
      <h2 className="techs__header">Технологии</h2>
      <div className="techs__header-line"/>
      <h3 className="techs__description-header">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__stack-list">
        <li className="techs__stack-item">HTML</li>
        <li className="techs__stack-item">CSS</li>
        <li className="techs__stack-item">JS</li>
        <li className="techs__stack-item">React</li>
        <li className="techs__stack-item">Git</li>
        <li className="techs__stack-item">Express.js</li>
        <li className="techs__stack-item">mongoDB</li>
      </ul>
    </div>
  )
}

export default Techs