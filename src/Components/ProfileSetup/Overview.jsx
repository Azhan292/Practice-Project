import React from 'react';
import './style.css';

import NormalBtn from '../Buttons/NormalBtn';
import InputField from '../TextInputs/InputField';
import TextArea from '../TextInputs/TextArea';

const Overview = ({ setShowSec, overview, setOverview }) => {
    const handleNext = () => {
        setShowSec('photo');
    }
    const handlePrev = () => {
        setShowSec('language');
    }
    const handleTitle = (e) => {
        setOverview({ ...overview, title: e.target.value });
    }
    const handleDesc = (e) => {
        setOverview({ ...overview, desc: e.target.value });
    }

    return (
        <div className="dashboard__sec">
            <h1 className="large__text">Overview</h1>
            <h2 className="small__text">6/9</h2>
            <h3 className="small__text"><span>Tell us about what your services?</span></h3>
            <h4 className="medium__text">Type</h4>
            <InputField type={'text'} placeholder={'Example: Designer & Developer'} value={overview.title} handleChange={handleTitle} />
            <h4 className="medium__text">Professional Overview</h4>
            <TextArea placeholder={'Tell something about you'} value={overview.desc} handleChange={handleDesc} />
            <div id="btn__group">
                <NormalBtn value={'Prev'} handleSubmit={handlePrev} />
                <NormalBtn value={'Next'} handleSubmit={handleNext} />
            </div>
        </div>
    )
}

export default Overview;

