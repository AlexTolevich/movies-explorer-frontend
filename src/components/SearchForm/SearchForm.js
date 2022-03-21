import './SearchForm.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch.js';

function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <input className="search-form__input" type="search" name="search-film" placeholder="Фильм" required/>
        <button className="search-form__button" type="submit" name="submit-search"/>
      </div>
      <div className="search-form__filter">
        <ToggleSwitch/>
        <p className="search-form__filter-label">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;