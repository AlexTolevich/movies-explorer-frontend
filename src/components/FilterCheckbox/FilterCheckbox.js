import "./FilterCheckbox.css"

function FilterCheckbox(){
  return(
    <label className="filter-checkbox">
      <input type="checkbox"/>
        <span className="filter-checkbox__slider"/>
    </label>
  )
}

export default FilterCheckbox;
