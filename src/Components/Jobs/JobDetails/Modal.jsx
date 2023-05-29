import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// icons and style
import { GrClose } from "react-icons/gr";
import "./modal.style.css";

// firebase
import { submitBidOnJob, bidOnJobAttachedFile } from "../../../Apis/API";

// components
import FullPageLoading from "../../../Screens/Loader/FullPageLoading";

const Modal = ({
  handleModal,
  coverLetter,
  price,
  clientId,
  jobKey,
  developmentCate,
  attachedFile,
  clearFields,
  setModal,
}) => {
  const history = useHistory();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const submitData = async (
    coverLetter,
    price,
    clientId,
    jobKey,
    developmentCate,
    attachedFile
  ) => {
    if (coverLetter && price && clientId && jobKey && developmentCate) {
      try {
        setLoading(true);
        await submitBidOnJob(
          coverLetter,
          price,
          clientId,
          jobKey,
          developmentCate
        );
        if (attachedFile && attachedFile.type) {
          console.log(attachedFile);
          console.log("Attached file is here");
          await bidOnJobAttachedFile(attachedFile, clientId, jobKey);
          console.log("Attached file is here");
        }
        setModal(false);
        setLoading(false);
        clearFields();
        history.push("/Jobs");
      } catch (error) {
        setModal(false);
        setLoading(false);
        clearFields();
        history.push("/Jobs");
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <FullPageLoading />}
      <div>
        <div className="overlay-background" onClick={handleModal}></div>
        <div className="escrow__modal"></div>
        <div className="escrow__modal">
          <div className="close__btn__group">
            <h1>Escrow</h1>
            <div className="close-btn" onClick={handleModal}>
              <GrClose />
            </div>
          </div>
          <div className="modal-inner">
            <p>
              You're submitting for a fixed-price project. While the majority of
              DSPRConnect projects are completed successfully, please keep a few
              things in mind:
              <br />
              <b>1.</b> Escrow Protection is in place for fixed-price jobs
              Before you start the project, you and the client must agree to
              requirements, a budget and milestones. DSPRConnect charges the
              client at the beginning of the project, and the money for a
              milestone is deposited in escrow.
              <br />
              <b>2.</b> Escrow funded payments are released when the client
              approves work When milestones are completed, the client can either
              approve work and release payment or request modifications to the
              work. Clients can also request that you approve the return of
              funds held in escrow.
              <br />
              <b>3.</b> DSPRConnect offers mediation services If you do the work
              and the client refuses to pay, DSPRConnect can help mediate the
              dispute. Please choose fixed-price jobs carefully. Only funds
              deposited for an active milestone are covered by Escrow
              Protection.
            </p>
            <input
              type="checkbox"
              id="agree"
              name="agree"
              value="agree"
              onChange={handleCheck}
            />
            <label for="agree">Click to agree</label>
            <div className="btn__group">
              <button onClick={handleModal}>Cancel</button>
              {!check ? (
                <button className="disabled__btn">Agree</button>
              ) : (
                <button
                  className="agree__btn"
                  onClick={() =>
                    submitData(
                      coverLetter,
                      price,
                      clientId,
                      jobKey,
                      developmentCate,
                      attachedFile
                    )
                  }
                >
                  Agree
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
