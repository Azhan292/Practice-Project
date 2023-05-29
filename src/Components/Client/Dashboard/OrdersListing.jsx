import React, { useState } from "react";

import "./orderslisting.style.css";

// components
import ReviewModal from "./ReviewModal";

// firebase
import useClientOrders from "../../../hooks/useClientOrders";
import { acceptOrder, rejectOrder } from "../../../Apis/API";

const OrdersListing = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { data } = useClientOrders(modalData);

  const getTodayDateStatus = (endDate) => {
    var deadline = new Date(endDate);
    var today = new Date();
    if (deadline - today < 0) {
      return "late";
    } else if (deadline === today) {
      return "notLate";
    } else {
      return "notLate";
    }
  };

  const handleReviewModal = (freelancerId, projectKey, reviews) => {
    let status = false;
    // checking if the review for this project is already added
    if (reviews && Object.values(reviews).length > 0) {
      Object.values(reviews).forEach((element) => {
        if (element.projectId === projectKey) {
          status = true;
        }
      });
    }
    if (!status) {
      setModalData({
        freelancerId: freelancerId,
        projectKey: projectKey,
      });
      setModal(true);
      document.body.style.overflowY = "hidden";
    } else {
      alert(
        "Review Already added, you cannot add multiple reviews on same project"
      );
    }
  };

  return (
    <>
      {modal ? (
        <ReviewModal
          setModal={setModal}
          modalData={modalData}
          setModalData={setModalData}
        />
      ) : null}
      {data &&
        data
          .map((data, index) => {
            var count = 0;
            return !data.milestone && data.payment ? (
              <div className="order__listings" key={index}>
                {data.deliever && data.deliever.accepted === "accepted" && (
                  <div
                    className="rating__btn"
                    onClick={() =>
                      handleReviewModal(data.id, data.key, data.reviews)
                    }
                  >
                    Rate
                  </div>
                )}
                <h1 className="large__text">
                  Active Order ${data.projectPrice}
                </h1>
                <div id="line"></div>
                <div className="flex">
                  <div className="flex__1">
                    <div className="profile__img">
                      <img src={data.profilePic} alt="freelancer" />
                    </div>
                    <div>
                      <h1 className="medium__text">{data.name}</h1>
                      <h2 className="small__text">{data.projectName}</h2>
                    </div>
                  </div>
                  <div>
                    <h2 className="medium__text">
                      <span>Price</span>
                    </h2>
                    <h2 className="small__text">${data.projectPrice}</h2>
                  </div>
                  <div>
                    <h2 className="medium__text">
                      <span>Delivery Time</span>
                    </h2>
                    <h2 className="small__text">{data.endDate}</h2>
                  </div>
                  <div>
                    <h2 className="medium__text">
                      <span>Start Time</span>
                    </h2>
                    <h2 className="small__text">{data.startDate}</h2>
                  </div>
                </div>
                <div id="line"></div>
                <div className="flex">
                  <div className="flex__1">
                    {data.deliever &&
                    data.deliever.accepted === "delievered" ? (
                      <div className="card__not__late">Delievered</div>
                    ) : data.deliever && data.deliever.accepted === "reject" ? (
                      <div className="card__late">Rejected</div>
                    ) : data.deliever &&
                      data.deliever.accepted === "accepted" ? (
                      <div className="card__not__late">Completed</div>
                    ) : (
                      <>
                        {getTodayDateStatus(data.endDate) === "late" ? (
                          <div className="card__late">Order canceled</div>
                        ) : (
                          <div className="card__not__late">{data.endDate}</div>
                        )}
                      </>
                    )}
                  </div>
                  {data.deliever &&
                  data.deliever.accepted &&
                  data.deliever.accepted === "delievered" ? (
                    <div>
                      <button
                        onClick={() => {
                          acceptOrder(data.key, data.to, data.projectPrice);
                        }}
                        className="accept__order__btn"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          rejectOrder(data.key, data.to);
                        }}
                        className="reject__order__btn"
                      >
                        Reject
                      </button>
                    </div>
                  ) : null}
                </div>
                {data.deliever && data.deliever.file && (
                  <a href={data.deliever.file}>Files</a>
                )}
              </div>
            ) : data.milestone ? (
              <div className="milestone__main__div">
                {data.milestone &&
                  data.milestone.length > 0 &&
                  data.milestone.slice(0, 1).map((check, index) => {
                    return (
                      check.payment && (
                        <h1 className="primary large__text milestone__project__name">
                          {data.projectName}
                        </h1>
                      )
                    );
                  })}
                {data.milestone &&
                  data.milestone.length > 0 &&
                  data.milestone.map((item) => {
                    if (
                      item.deliever &&
                      item.deliever.accepted === "accepted"
                    ) {
                      count++;
                      if (count === data.milestone.length) {
                        return (
                          <div
                            className="rating__btn"
                            onClick={() =>
                              handleReviewModal(data.to, data.key, data.reviews)
                            }
                          >
                            Rate
                          </div>
                        );
                      }
                    }
                  })}
                {data.milestone &&
                  data.milestone.length > 0 &&
                  data.milestone.map((milestoneData, index) => {
                    return (
                      milestoneData.payment && (
                        <div className="order__listings" key={index}>
                          <div id="line"></div>
                          <div className="flex">
                            <div className="flex__1">
                              <div className="profile__img">
                                <img src={data.profilePic} alt="freelancer" />
                              </div>
                              <div>
                                <h1 className="medium__text">{data.name}</h1>
                                <h2 className="small__text">
                                  {milestoneData.title}
                                </h2>
                              </div>
                            </div>
                            <div>
                              <h2 className="medium__text">
                                <span>Price</span>
                              </h2>
                              <h2 className="small__text">
                                ${milestoneData.price}
                              </h2>
                            </div>
                            <div>
                              <h2 className="medium__text">
                                <span>Delivery Time</span>
                              </h2>
                              <h2 className="small__text">
                                {milestoneData.endDate}
                              </h2>
                            </div>
                            <div>
                              <h2 className="medium__text">
                                <span>Start Time</span>
                              </h2>
                              <h2 className="small__text">
                                {milestoneData.startDate}
                              </h2>
                            </div>
                          </div>
                          <div id="line"></div>
                          <div className="flex">
                            <div className="flex__1">
                              {milestoneData.deliever &&
                              milestoneData.deliever.accepted ===
                                "delievered" ? (
                                <div className="card__not__late">
                                  Delievered
                                </div>
                              ) : milestoneData.deliever &&
                                milestoneData.deliever.accepted === "reject" ? (
                                <div className="card__late">Rejected</div>
                              ) : milestoneData.deliever &&
                                milestoneData.deliever.accepted ===
                                  "accepted" ? (
                                <div className="card__not__late">Completed</div>
                              ) : (
                                <>
                                  {getTodayDateStatus(milestoneData.endDate) ===
                                  "late" ? (
                                    <div className="card__late">
                                      Order canceled
                                    </div>
                                  ) : (
                                    <div className="card__not__late">
                                      {milestoneData.endDate}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                            {milestoneData.deliever &&
                            milestoneData.deliever.accepted &&
                            milestoneData.deliever.accepted === "delievered" ? (
                              <div>
                                <button
                                  onClick={() => {
                                    acceptOrder(
                                      data.key,
                                      data.to,
                                      milestoneData.price,
                                      index
                                    );
                                  }}
                                  className="accept__order__btn"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => {
                                    rejectOrder(data.key, data.to, index);
                                  }}
                                  className="reject__order__btn"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : null}
                          </div>
                          {milestoneData.deliever &&
                            milestoneData.deliever.file && (
                              <a href={milestoneData.deliever.file}>Files</a>
                            )}
                        </div>
                      )
                    );
                  })}
              </div>
            ) : null;
          })
          .reverse()}
    </>
  );
};

export default OrdersListing;
