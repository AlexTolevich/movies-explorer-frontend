import "./FilterCheckbox.css"
import React from 'react';

function FilterCheckbox({short, handleShort}){

  return(
    <label className="filter-checkbox">
      <input
        type="checkbox"
        name="checkbox"
        checked={short}
        onChange={handleShort}
      />
        <span className="filter-checkbox__slider"/>
    </label>
  )
}

export default FilterCheckbox;
