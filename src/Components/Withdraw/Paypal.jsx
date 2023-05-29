import React from 'react'
import './paypal.style.css'

// components
import InputField from '../TextInputs/InputField';
import SelectField from '../TextInputs/SelectField';
import NormalBtn from '../Buttons/NormalBtn';

const Paypal = () => {
    const [currencies, setCurrencies] = React.useState(['USD', 'AUD', 'GBP', 'CAD', 'SAR']);
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[0]);
    const [amount, setAmount] = React.useState(0);
    const [paypalEmail, setPaypalEmail] = React.useState('paypal@gmail.com');

    const handleSelect = (e) => {
        setSelectedCurrency(e.target.value);
    }

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    const handleSubmit = () => {
        console.log('submitted');
    }

    return (
        <div className="withdraw__paypal">
            <h1 className="main__heading">Paypal</h1>
            <div className="flex">
                <div>
                    <h2 className="medium__text primary">Paypal Email</h2>
                    <h2 className="medium__text">{paypalEmail}</h2>
                </div>
                <div>
                    <h2 className="medium__text">You will Recieve</h2>
                    <h2 className="medium__text">${amount}</h2>
                </div>
            </div>
            <h1 className="medium__text primary">Amount to withdraw</h1>
            <div className="flex">
                <div className="input">
                    <InputField placeholder={"$"} type={"number"} value={amount} handleChange={handleAmount} />
                </div>
                <div className="select">
                    <SelectField placeholder="Select" values={currencies} value={selectedCurrency} handleChange={handleSelect} />
                </div>
            </div>
            <div className="submit__btn">
                <NormalBtn value={"Withdraw Fund"} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Paypal
