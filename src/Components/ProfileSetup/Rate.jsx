import React, { useEffect } from 'react';
import NormalBtn from '../Buttons/NormalBtn';
import InputField from '../TextInputs/InputField';
import './style.css';

const Rate = ({ setShowSec, rate, setRate }) => {
    const feeRate = 20;
    const handleNext = () => {
        setShowSec('overview');
    }
    const handlePrev = () => {
        setShowSec('language');
    }
    const handleHourlyRate = (e) => {
        setRate({...rate, hourlyRate: e.target.value})
    }

    useEffect(() => {
        if(rate.hourlyRate) {
            const feeAmount = (rate.hourlyRate / 100) * feeRate;
            setRate({
                ...rate, 
                fee: feeAmount,
                receiveValue: (rate.hourlyRate - feeAmount)
            })
        }
        if(!rate.hourlyRate) {
            setRate({
                ...rate, 
                fee: 0,
                receiveValue: 0
            })
        }
    }, [rate.hourlyRate]);

    return (
        <div className="dashboard__sec">
            <h1 className="large__text">Hourly Rate</h1>
            <h2 className="small__text">5/9</h2>
            <h3 className="small__text"><span>Tell us about what service you will offer?</span></h3>
            <div id="input__flex">
                <div id="text__flex">
                    <h2 className="medium__text">Hourly Rate</h2>
                    <h3 className="small__text">Total amount the client will see</h3>
                </div>
                <InputField type={'text'} placeholder={''} value={rate.hourlyRate} handleChange={handleHourlyRate} /> /hr
            </div>
            <div id="input__flex">
                <div id="text__flex">
                    <h2 className="medium__text">Our web fee</h2>
                    <h3 className="small__text">Total amount we will take from your amount</h3>
                </div>
                <div className="fee"><h2 className="small__text">{rate.fee}</h2></div> /hr
                {/* <InputField type={'text'} placeholder={'-0.00'} value={rate.fee} handleChange={handleFee} /> /hr */}
            </div>
            <div id="input__flex">
                <div id="text__flex">
                    <h2 className="medium__text">You will recieve</h2>
                    <h3 className="small__text">Estiamte amount you will recieve after service fee</h3>
                </div>
                <div className="recieve__amount"><h2 className="small__text">{rate.receiveValue}</h2></div> /hr
                {/* <InputField type={'text'} placeholder={''} value={rate.receiveValue} handleChange={handleReceive} /> /hr */}
            </div>
            <div id="btn__group">
                <NormalBtn value={'Prev'} handleSubmit={handlePrev} />
                <NormalBtn value={'Next'} handleSubmit={handleNext} />
            </div>
        </div>
    )
}

export default Rate
