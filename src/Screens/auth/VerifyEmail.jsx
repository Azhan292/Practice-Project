import React from 'react';
import './style.css';

// icons
import { BsFillImageFill } from "react-icons/bs";

import NormalBtn from '../../Components/Buttons/NormalBtn';

const VerifyEmail = () => {
    return (
        <div className="verify__email__page">
            <div className="verify__email__box">
                <BsFillImageFill />
                <h1 className="large__text">Verify your email to proceed</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem sed quidem doloremque 
                    id modi excepturi, beatae fuga, ratione
                </p>
                <NormalBtn value={'Resent Verification'} />
            </div>
        </div>
    )
}

export default VerifyEmail
