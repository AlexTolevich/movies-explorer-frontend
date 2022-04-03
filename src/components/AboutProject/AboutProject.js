import './AboutProject.css';

function AboutProject() {
  return (
    <div className="about-project" id={'about-project'}>
      <h2 className="about-project__header">О проекте</h2>
      <div className="about-project__header-line"/>
      <div className="about-project__table">
        <h3 className="about-project__table-header" id="head1">Дипломный проект включал 5 этапов</h3>
        <h3 className="about-project__table-header" id="head2">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__table-text" id="text1">Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.</p>
        <p className="about-project__table-text" id="text2">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__periods">
        <div className="about-project__periods-backend">1 неделя</div>
        <div className="about-project__periods-frontend">4 недели</div>
        <p className="about-project__periods-description">Back-end</p>
        <p className="about-project__periods-description">Front-end</p>
      </div>
    </div>
  )
}

export default AboutProject;