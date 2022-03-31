import "./FilterCheckbox.css"
import React from 'react';

function FilterCheckbox({short, handleShort}){

  // const [isActiveSwitch, setIsActiveSwitch] = React.useState(false);

  // const handleChangeSwitch = (event) => {
  //   let value = event.target.checked
  //   setIsActiveSwitch(value);
  //   short(value);
  // }

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
