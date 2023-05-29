import React from 'react';
import './emptybtn.style.css';

const EmptyBtn = ({ value, handleSubmit }) => {
    return (
        <div className="empty__btn">
            <button onClick={handleSubmit}>{value}</button>
        </div>
    )
}

export default EmptyBtn
