import "./ToggleSwitch.css"

function ToggleSwitch(){
  return(
    <label className="toggle-switch">
      <input type="checkbox"/>
        <span className="toggle-switch__slider toggle-switch__round"/>
    </label>
  )
}

export default ToggleSwitch;
