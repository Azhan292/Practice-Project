import React from 'react';
import './uploadphoto.style.css';

const UploadPhoto = ({ handleChange }) => {
    return (
        <div className="upload__photo">
            <div className="upload-photo-btn-wrapper">
                <button class="btn">
                    <h3 className="medium__text"><strong>+ Add Profile photo</strong></h3>
                </button>
                <input type="file" name="myfile" onChange={handleChange} accept="image/png, image/jpg, image/jpeg"  />
            </div>
        </div>
    )
}

export default UploadPhoto
