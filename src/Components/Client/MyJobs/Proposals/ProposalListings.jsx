import React from "react";
import { Link } from "react-router-dom";
import "./proposallisting.style.css";

// moment
import moment from "moment";

// firebase
import { acceptProposal, rejectProposal } from "../../../../Apis/API";

// icons
import Proposal from "../../../../Assets/SVG/proposal.svg";
import { BiTimeFive } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";

// components
import ReadMore from "../../../CommonComponents/ReadMore";

const ProposalListings = ({ proposals, freelancer }) => {
  return (
    <div className="proposals__listing__sec">
      {proposals.length > 0 ? (
        <>
          <h1 className="large__text primary count">
            {proposals.length} Proposal(s) found
          </h1>
          <div id="line"></div>
          {proposals &&
            proposals.map((data, index) => {
              return (
                <div key={index}>
                  <div id="my__proposal">
                    {!freelancer ? (
                      <h2 className="profile__link medium__text">
                        <Link to={`/Profile/${data.submittedBy}`}>
                          View Profile
                        </Link>
                      </h2>
                    ) : null}
                    <div className="proposal__heading">
                      <img src={Proposal} alt="proposal" />
                      <h2 className="medium__text">
                        <strong>Cover Letter</strong>
                      </h2>
                    </div>
                    <ReadMore maxCharacterCount={300}>
                      {data.coverLetter}
                    </ReadMore>
                    <div className="proposals__inner__data">
                      <div className="heading">
                        <strong>
                          <ImPriceTags />
                          Price:{" "}
                        </strong>
                      </div>
                      <h2 className="small__text">${data.hourRate}</h2>
                    </div>
                    <div className="proposals__inner__data">
                      <div className="heading">
                        <strong>
                          <BiTimeFive />
                          Submitted On:{" "}
                        </strong>
                      </div>
                      <h2 className="small__text">
                        {moment(data.submittedDate).fromNow()}
                      </h2>
                    </div>
                    {data.attachedCover && (
                      <h2 className="small__text">
                        <a href={data.attachedCover}>
                          Attached File - Click to download
                        </a>
                      </h2>
                    )}
                    {!freelancer ? (
                      <div className="btn__group">
                        <button
                          className="accept__btn"
                          onClick={() =>
                            acceptProposal(
                              data.submittedBy,
                              data.coverLetter,
                              data.jobKey,
                              data.hourRate
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="reject__btn"
                          onClick={() =>
                            rejectProposal(data.submittedBy, data.jobKey)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div id="line"></div>
                </div>
              );
            })}
        </>
      ) : (
        <div className="no__proposals__found">
          <img src={Proposal} alt="proposal" />
          <h1 className="large__text">No Proposals</h1>
        </div>
      )}
    </div>
  );
};

export default ProposalListings;
