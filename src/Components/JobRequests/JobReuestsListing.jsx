import React, { useState, useEffect } from "react";
import "./jobrequestslisting.style.css";

// redux
import { useSelector } from "react-redux";

// firebase
import { auth, db } from "../../firebase";
import { acceptRequest, rejectRequest } from "../../Apis/API";
import useJobRequests from "../../hooks/useJobRequests";

// icons
import { BiTimeFive } from "react-icons/bi";
import { ImPriceTags } from "react-icons/im";
import { MdWork } from "react-icons/md";

// components
import Stripe from "../Payments/Stripe";
import ReadMore from "../CommonComponents/ReadMore";

// moment
import moment from "moment";

const JobReuestsListing = () => {
  const userType = useSelector((state) => state.userReducer.userType);
  const { jobRequests } = useJobRequests(userType);

  return (
    <div className="job__requests__listing">
      {jobRequests && jobRequests.length > 0 ? (
        jobRequests.map((request) => {
          return (
            <div key={request.key}>
              <div className="job__request">
                <h1 className="large__text primary">
                  <strong>
                    <MdWork />
                    {request.projectName}
                  </strong>
                </h1>
                {!request.milestone ? (
                  <>
                    {request.projectDetails && (
                      <ReadMore maxCharacterCount={300}>
                        {request.projectDetails}
                      </ReadMore>
                    )}
                    <div className="job__request__inner__data">
                      <div className="heading">
                        <strong>
                          <ImPriceTags />
                          Price:{" "}
                        </strong>
                      </div>
                      <h2 className="small__text">${request.projectPrice}</h2>
                    </div>
                    <div className="job__request__inner__data">
                      <div className="heading">
                        <strong>
                          <BiTimeFive />
                          Start:{" "}
                        </strong>
                      </div>
                      <h2 className="small__text">
                        {moment(request.startDate).fromNow()}
                      </h2>
                    </div>
                  </>
                ) : (
                  request &&
                  request.milestone &&
                  request.milestone.length > 0 &&
                  request.milestone.map((val, index) => {
                    return (
                      <>
                        <h1 className="medium__text primary">
                          <strong>{val.title}</strong>
                        </h1>
                        {val.desc && (
                          <ReadMore maxCharacterCount={300}>
                            {val.desc}
                          </ReadMore>
                        )}
                        <div className="job__request__inner__data">
                          <div className="heading">
                            <strong>
                              <ImPriceTags />
                              Price:{" "}
                            </strong>
                          </div>
                          <h2 className="small__text">${val.price}</h2>
                        </div>
                        <div className="job__request__inner__data">
                          <div className="heading">
                            <strong>
                              <BiTimeFive />
                              Start:{" "}
                            </strong>
                          </div>
                          <h2 className="small__text">
                            {moment(val.startDate).fromNow()}
                          </h2>
                          {val.attachedCover && (
                            <h2 className="small__text">
                              <a href={val.attachedCover}>
                                Attached File - Click to download
                              </a>
                            </h2>
                          )}
                          {userType === "Freelancer" ? (
                            <div className="btn__group">
                              {!val.active && (
                                <>
                                  <button
                                    className="job__status__accepted"
                                    onClick={() =>
                                      acceptRequest(
                                        request.from,
                                        request.key,
                                        index
                                      )
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="job__status__rejected"
                                    onClick={() =>
                                      rejectRequest(request.from, request.key)
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          ) : null}
                          {userType === "Client" ? (
                            <div className="btn__group">
                              {val.active && !val.payment ? (
                                <Stripe data={request} index={index} />
                              ) : val.active && val.payment ? (
                                <div className="paid">Paid</div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      </>
                    );
                  })
                )}
                {!request.milestone && request.attachedCover && (
                  <h2 className="small__text">
                    <a href={request.attachedCover}>
                      Attached File - Click to download
                    </a>
                  </h2>
                )}
                {!request.milestone && userType === "Freelancer" ? (
                  <div className="btn__group">
                    {!request.active && (
                      <>
                        <button
                          className="job__status__accepted"
                          onClick={() =>
                            acceptRequest(request.from, request.key)
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="job__status__rejected"
                          onClick={() =>
                            rejectRequest(request.from, request.key)
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                ) : null}
                {!request.milestone && userType === "Client" ? (
                  <div className="btn__group">
                    {request.active && !request.payment ? (
                      <Stripe data={request} />
                    ) : request.active && request.payment ? (
                      <div className="paid">Paid</div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div id="line"></div>
            </div>
          );
        })
      ) : (
        <div className="no__job__requestFound">No Job Requests Found</div>
      )}
    </div>
  );
};

export default JobReuestsListing;
