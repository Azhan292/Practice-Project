import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { TiDelete } from "react-icons/ti";
import { AiOutlineFieldTime } from "react-icons/ai";
import { ImPriceTags } from "react-icons/im";
import { MdWork } from "react-icons/md";

// firebase
import useMyJobs from "../../../hooks/useMyJobs";
import { deleteMyJob } from "../../../Apis/API";

// moment
import moment from "moment";

// loading
import Loading from "../../../Screens/Loader/Loading";

// style
import "./myjobslisting.style.css";

const JobsListing = () => {
  const { loading, myJobs } = useMyJobs();

  return (
    <div className="my__job__listings__sec">
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        myJobs &&
        myJobs.map((data, index) => {
          return (
            <div key={index}>
              <div id="my__job">
                <div
                  className="delete"
                  onClick={() => deleteMyJob(data.jobKey)}
                >
                  <TiDelete />
                </div>
                <Link to={`/Myjobs/${data.jobKey}`}>
                  <h1 className="medium__text my__job__title">
                    <strong>{data.title}</strong>
                  </h1>
                </Link>
                <p className="small__text">{data.description}</p>
                <div className="my__jobs__outer__flex">
                  <div id="flex">
                    <h2 className="small__text">
                      <strong>
                        <ImPriceTags />
                        Price
                      </strong>
                    </h2>
                    <h2 className="small__text">
                      <strong>
                        <AiOutlineFieldTime />
                        Duration
                      </strong>
                    </h2>
                    <h2 className="small__text">
                      <strong>
                        <MdWork />
                        Experience
                      </strong>
                    </h2>
                  </div>
                  <div id="flex">
                    <h2 className="small__text">${data.rate}</h2>
                    <h2 className="small__text">{data.duration}</h2>
                    <h2 className="small__text">{data.freelancerLevel}</h2>
                  </div>
                </div>
                <h2 className="small__text">
                  <strong>Posted: </strong>
                  {moment(data.postedTime).fromNow()}
                </h2>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default JobsListing;
