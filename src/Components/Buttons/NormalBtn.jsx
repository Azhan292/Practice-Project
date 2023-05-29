import React from 'react';
import './normalbtn.style.css';

const NormalBtn = ({ value, handleSubmit }) => {
    return (
        <div className="normal__btn">
            <button onClick={handleSubmit}>{value}</button>
        </div>
    )
}

export default NormalBtn;
