import React from 'react';
import './selectfield.style.css';

const SelectField = ({placeholder, values, value, handleChange}) => {
    return (
        <div id="select__input">
            <select value={value} onChange={handleChange}>
                <option value="" selected disabled>{placeholder}</option>
                {values.map((val, index) => {
                    return (
                        <option value={val} key={index}>{val}</option>
                    );
                })}
            </select>
        </div>
    )
}

export default SelectField
