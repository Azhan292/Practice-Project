import React from "react";
import "./inputfield.style.css";

const InputField = ({ type, placeholder, value, handleChange, name }) => {
  return (
    <div id="input__field">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
