import React, {PropTypes} from 'react';

const TextInput = ({type, name, label, onChange, icon, value, error}) => {
  let wrapperClass = 'input-field col s12';
  if (error && error.length > 0) {
    wrapperClass += " red-text";
  }

  return (
    <div className={wrapperClass}>
      <i className="material-icons prefix">{icon}</i>
      <input
      type={type}
      name={name}
      className="validate"
      value={value}
      onChange={onChange}/>
      {error && <div id="card-alert" className="card red">
        <div className="card-content white-text">
          <p>{error}</p>
        </div>
      </div>}
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

export default TextInput;