import React, { useState, useEffect } from "react";
import "./modal.style.css";

// icons and style
import { GrClose } from "react-icons/gr";

// components
import InputField from "../TextInputs/InputField";

// firebase
import { uploadAccountDetails } from "../../Apis/API";
import useClientLocation from "../../hooks/useClientLocation";

const Modal = ({ handleModal }) => {
  const { clientCity, clientCountry } = useClientLocation();
  const [cardHolderName, setCardHolderName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);

  const updateAccountDetails = async (cardHolderName, cardNumber) => {
    try {
      await uploadAccountDetails(cardHolderName, cardNumber);
      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCardNumber(clientCity);
    setCardHolderName(clientCountry);
  }, [clientCity, clientCountry]);

  return (
    <div>
      <div className="overlay-background" onClick={handleModal}></div>
      <div className="update__profile__modal">
        <div className="close__btn__group">
          <div className="close-btn" onClick={handleModal}>
            <GrClose />
          </div>
        </div>
        <div className="modal-inner">
          <InputField
            type="text"
            placeholder="Card Holder Name"
            value={cardHolderName}
            handleChange={(e) => setCardHolderName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            handleChange={(e) => setCardNumber(e.target.value)}
          />
          <button
            className="upload__payment__info__btn"
            onClick={() => updateAccountDetails(cardHolderName, cardNumber)}
          >
            Upload Payment Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
