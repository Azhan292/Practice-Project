import React from 'react';

// Components
import InputField from '../TextInputs/InputField';
import NormalBtn from '../Buttons/NormalBtn';

const Address = ({ setShowSec, phone, setPhone }) => {
    const handleNext = () => {
        setShowSec('submit');
    }
    const handlePrev = () => {
        setShowSec('address');
    }
    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    return (
        <div className="dashboard__sec">
            <h1 className="large__text">Phone Number</h1>
            <h2 className="small__text">9/9</h2>
            <h4 className="medium__text">Add your phone number</h4>
            <InputField type={'text'} placeholder={'Enter number'} value={phone} handleChange={handlePhone} />
            <div id="btn__group">
                <NormalBtn value={'Prev'} handleSubmit={handlePrev} />
                <NormalBtn value={'Next'} handleSubmit={handleNext} />
            </div>
        </div>
    )
}

export default Address
