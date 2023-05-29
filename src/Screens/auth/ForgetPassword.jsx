import React, { useState } from "react";

// icons
import { GrClose } from "react-icons/gr";

// components
import InputField from "../../Components/TextInputs/InputField";

// firebase
import { auth } from "../../firebase";

const ForgetPassword = ({ handleModal }) => {
  const [email, setEmail] = useState("");
  const sendEmail = (email) => {
    var actionCodeSettings = {
      url: "http://localhost:3000/Signin",
      handleCodeInApp: false,
    };
    auth
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        alert("Reset Password Email Send Successfully");
        handleModal();
      })
      .catch((error) => {
        alert("Error occurred", error);
      });
  };
  return (
    <div>
      <div className="overlay-background" onClick={handleModal}></div>
      <div className="forget__password__modal">
        <div className="close__btn__group">
          <div className="close-btn" onClick={handleModal}>
            <GrClose />
          </div>
        </div>
        <div className="modal-inner">
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="forget__password__modal__btn"
            onClick={() => sendEmail(email)}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
