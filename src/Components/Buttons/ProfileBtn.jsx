import React from 'react';
import './profilebtn.style.css';

const ProfileBtn = () => {
    return (
        <div>
            <div className="btn__section">
                <div className="btns">
                    <button className="active__proposals active small__text"><strong>General</strong></button>
                    <button className="archieved__proposals small__text"><strong>Product Design</strong></button>
                    <button className="archieved__proposals small_text"><strong>Mobile UX Design</strong></button>
                </div>
            </div>
        </div>
    )
}

export default ProfileBtn
