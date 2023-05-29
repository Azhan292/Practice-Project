import React from 'react';
import './style.css';

import NormalBtn from '../Buttons/NormalBtn';
import EmptyBtn from '../Buttons/EmptyBtn';

// icons
import { AiOutlineFileAdd } from 'react-icons/ai';

const Resume = ({ setShowSec, resume, setResume }) => {
    const handleNext = () => {
        setShowSec('language');
    }
    const handlePrev = () => {
        setShowSec('experience');
    }
    const handleResume = (e) => {
        setResume(e.target.files[0]);
        console.log(e.target.files[0])
    }

    return (
        <div className="dashboard__sec">
            <h1 className="large__text">Resume / CV</h1>
            <h2 className="small__text">3/9</h2>
            <h2 className="small__text"><span>upload docs and pdf files only</span></h2>
            <div className="upload__sec">
                <div className="upload-btn-wrapper">
                    <button className="btn">
                        <AiOutlineFileAdd />
                        <h3 className="small__text"><span><strong>Tap to add your file here</strong></span></h3>
                    </button>
                    <input type="file" name="myfile" onChange={handleResume} accept="application/pdf, application/msword" />
                </div>
            </div>
            <div id="success">
                {resume && resume.name ? resume.name : null}
                {resume && !resume.name ? <a href={resume}>Resume Uploaded (click to download)</a> : null}
            </div>
            <div id="error">
                {!resume ? "Resume Not Uploaded" : null}
            </div>
            {/* <EmptyBtn value={'Upload'} /> */}
            <div id="btn__group">
                <NormalBtn value={'Prev'} handleSubmit={handlePrev} />
                <NormalBtn value={'Next'} handleSubmit={handleNext} />
            </div>
        </div>
    )
}

export default Resume
