import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.js';

function SearchForm({onSubmitSearch, short, handleShort, handleChange, inputSearch}) {
  return (
    <form
      className="search-form"
      onSubmit={onSubmitSearch}
    >
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="search"
          name="search-film"
          placeholder="Фильм"
          onChange={handleChange}
          defaultValue={inputSearch}
        />
        <button className="search-form__button" type="submit" name="submit-search"/>
      </div>
      <div className="search-form__filter">
        <FilterCheckbox short={short} handleShort={handleShort}/>
        <p className="search-form__filter-label">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;