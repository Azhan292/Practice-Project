import React from "react";

const Checkbox = ({ value, label, handleClick }) => {
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        value={value}
        onClick={handleClick}
      />
      <label htmlFor="checkbox">{label}</label>
      <br />
    </div>
  );
};

export default Checkbox;
