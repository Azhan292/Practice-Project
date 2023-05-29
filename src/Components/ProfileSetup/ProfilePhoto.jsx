import React, { useState } from 'react';
import './style.css';

import NormalBtn from '../Buttons/NormalBtn';

// icons
import { FaUserAlt } from 'react-icons/fa';
import UploadPhoto from '../TextInputs/UploadPhoto';

const ProfilePhoto = ({ setShowSec, setPhoto, photo }) => {
    const handleNext = () => {
        setShowSec('address');
    }
    const handlePrev = () => {
        setShowSec('overview');
    }
    const handleImage = (e) => {
        setPhoto({...photo, details: e.target.files[0], url: URL.createObjectURL(e.target.files[0])});
    }

    return (
        <div className="dashboard__sec">
            <h1 className="large__text">Profile Photo</h1>
            <h2 className="small__text">7/9</h2>
            <h2 className="small__text"><span>Please upload a professional photo that clearly show your face</span></h2>
            <div className="photo__sec">
                <div id="photo">
                    {photo && photo.url
                    ? <img src={photo.url} alt='user' /> : ""}
                    {!photo ? <FaUserAlt /> : ""}
                </div>
                <UploadPhoto handleChange={handleImage} />
            </div>
            <div id="btn__group">
                <NormalBtn value={'Prev'} handleSubmit={handlePrev} />
                <NormalBtn value={'Next'} handleSubmit={handleNext} />
            </div>
        </div>
    )
}

export default ProfilePhoto
