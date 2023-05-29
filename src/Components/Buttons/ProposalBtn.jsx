import React from 'react';
import './proposalbtn.style.css'

const ProposalBtn = () => {
    return (
        <div className="btn__section">
            <div className="btns">
                <button className="active__proposals active medium__text__bold">Active</button>
                <button className="archieved__proposals medium__text__bold">Archieved</button>
            </div>
        </div>
    )
}

export default ProposalBtn
