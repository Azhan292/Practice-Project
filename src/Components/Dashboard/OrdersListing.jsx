import React, { useState, useEffect } from "react";
import "./orderslisting.style.css";

// firebase
import { delieverOrder } from "../../Apis/API";
import useFreelancerOrders from "../../hooks/useFreelancerOrders";

// components
import FullPageLoading from "../../Screens/Loader/FullPageLoading";
import ReviewModal from "./ReviewModal";

const OrdersListing = () => {
  // const [data, setData] = useState([]);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const { data } = useFreelancerOrders(modalData);

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

  const deliever = async (freelancer, client, orderKey, file, index) => {
    try {
      if (file && file.name) {
        setLoading(true);
        await delieverOrder(freelancer, client, orderKey, file, index);
      } else {
        alert("Choose a file to uplaod please");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    alert("Order Delievered Successfully");
  };

  const handleReviewModal = (clientId, projectKey, reviews) => {
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
        clientId: clientId,
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
          setModalData={setModalData}
          modalData={modalData}
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
                      handleReviewModal(data.from, data.key, data.reviews)
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
                      <img src={data.profilePic} alt="client" />
                    </div>
                    <div>
                      <h1 className="medium__text">{data.name}</h1>
                      <h1 className="small__text">{data.projectName}</h1>
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
                    data.deliever.delievery &&
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
                          <div className="card__late">
                            Order canceled due to date passed
                          </div>
                        ) : (
                          <div className="card__not__late">{data.endDate}</div>
                        )}
                      </>
                    )}
                  </div>
                  {!data.deliever &&
                  getTodayDateStatus(data.endDate) === "notLate" ? (
                    <div className="upload__order">
                      <input
                        type="file"
                        id="upload"
                        onChange={(e) => setFile(e.target.files[0])}
                        diabled={loading}
                        hidden
                      />
                      <label for="upload">Upload Project File</label>
                      {file && file.name ? file.name : ""}
                      <button
                        className="deliver__btn"
                        onClick={() =>
                          deliever(data.to, data.from, data.key, file)
                        }
                        diabled={loading}
                      >
                        {loading && <FullPageLoading />}Deliever
                      </button>
                    </div>
                  ) : null}
                  {data.deliever &&
                  !data.deliever.delievery &&
                  getTodayDateStatus(data.endDate) === "notLate" ? (
                    <div className="upload__order">
                      <input
                        type="file"
                        id="upload"
                        onChange={(e) => setFile(e.target.files[0])}
                        diabled={loading}
                        hidden
                      />
                      <label for="upload">Upload Project File</label>
                      {file && file.name ? file.name : ""}
                      <button
                        className="deliver__btn"
                        onClick={() =>
                          deliever(data.to, data.from, data.key, file)
                        }
                        diabled={loading}
                      >
                        {loading && <FullPageLoading />}Deliever Again
                      </button>
                    </div>
                  ) : null}
                </div>
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
                              handleReviewModal(
                                data.from,
                                data.key,
                                data.reviews
                              )
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
                                <img src={data.profilePic} alt="client" />
                              </div>
                              <div>
                                <h1 className="medium__text">{data.name}</h1>
                                <h1 className="small__text">
                                  {milestoneData.title}
                                </h1>
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
                              milestoneData.deliever.delievery &&
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
                                      Order canceled due to date passed
                                    </div>
                                  ) : (
                                    <div className="card__not__late">
                                      {milestoneData.endDate}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                            {!milestoneData.deliever &&
                            getTodayDateStatus(milestoneData.endDate) ===
                              "notLate" ? (
                              <div className="upload__order">
                                <input
                                  type="file"
                                  id="upload"
                                  onChange={(e) => setFile(e.target.files[0])}
                                  diabled={loading}
                                  hidden
                                />
                                <label for="upload">Upload Project File</label>
                                {file && file.name ? file.name : ""}
                                <button
                                  className="deliver__btn"
                                  onClick={() =>
                                    deliever(
                                      data.to,
                                      data.from,
                                      data.key,
                                      file,
                                      index
                                    )
                                  }
                                  diabled={loading}
                                >
                                  {loading && <FullPageLoading />}Deliever
                                </button>
                              </div>
                            ) : null}
                            {milestoneData.deliever &&
                            !milestoneData.deliever.delievery &&
                            getTodayDateStatus(milestoneData.endDate) ===
                              "notLate" ? (
                              <div className="upload__order">
                                <input
                                  type="file"
                                  id="upload"
                                  onChange={(e) => setFile(e.target.files[0])}
                                  diabled={loading}
                                  hidden
                                />
                                <label for="upload">Upload Project File</label>
                                {file && file.name ? file.name : ""}
                                <button
                                  className="deliver__btn"
                                  onClick={() =>
                                    deliever(
                                      data.to,
                                      data.from,
                                      data.key,
                                      file,
                                      index
                                    )
                                  }
                                  diabled={loading}
                                >
                                  {loading && <FullPageLoading />}Deliever Again
                                </button>
                              </div>
                            ) : null}
                          </div>
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
