import React, { useState, useEffect } from "react";
import "./modal.style.css";

// icons and style
import { GrClose } from "react-icons/gr";

// components
import InputField from "../../TextInputs/InputField";

// firebase
import { updateClientLocation } from "../../../Apis/API";
import useClientLocation from "../../../hooks/useClientLocation";

const Modal = ({ handleModal }) => {
  const { clientCity, clientCountry } = useClientLocation();
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  const updateProfile = async (city, country) => {
    try {
      await updateClientLocation(city, country);
      handleModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCity(clientCity);
    setCountry(clientCountry);
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
            placeholder="Country"
            value={country}
            handleChange={(e) => setCountry(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="City"
            value={city}
            handleChange={(e) => setCity(e.target.value)}
          />
          <button
            className="update__profile__btn"
            onClick={() => updateProfile(city, country)}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
