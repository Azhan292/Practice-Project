import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./jobslisting.style.css";
import SearchInput from "../TextInputs/SearchInput";

// icons
import { AiOutlineFieldTime } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import { ImPriceTags } from "react-icons/im";
import { MdWork } from "react-icons/md";

// firebase
import { auth, db } from "../../firebase";
import { querybase } from "querybase";

// moment
import moment from "moment";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setJobs, selectedJob } from "../../Redux/Actions/jobsActions";

// loading
import Loading from "../../Screens/Loader/Loading";
import ReadMore from "../CommonComponents/ReadMore";

const JobsListing = ({
  handleModal,
  categoryFilter,
  setCategoryFilter,
  duration,
  setDuration,
}) => {
  const [jobCount, setJobCount] = useState(0);
  const dispatch = useDispatch();
  const jobData = useSelector((state) => state.jobsReducer);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(6);

  const getAllJobs = async () => {
    setDuration("");
    setCategoryFilter("");
    setSearchInput("");
    setCount(6);
    setLoading(true);
    const Jobs = db.ref("AllJobs");
    Jobs.once("value", (snapshot) => {
      setJobCount(snapshot.numChildren());
    });
    const allJobs = db.ref("AllJobs").orderByChild("postedTime");
    allJobs.once("value", async (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        let arr = Object.values(snapshot.val());
        dispatch(setJobs(arr.reverse()));
      }
    });
  };

  const setJobDetail = (data) => {
    dispatch(selectedJob(data));
  };

  useEffect(async () => {
    await getAllJobs();
  }, []);

  return loading ? (
    <div className="loading">
      <Loading />
    </div>
  ) : (
    <>
      <div className="job__listings__sec">
        <button className="refresh" onClick={getAllJobs}>
          <FiRefreshCw />
        </button>
        <div id="input">
          <SearchInput
            type={"text"}
            placeholder={"Search"}
            handleChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="sm__filter">
            <h2 className="small__text" onClick={handleModal}>
              Advance Filters
            </h2>
          </div>
        </div>
        <div id="line"></div>
        <div className="jobs__count">
          <h2 className="medium__text">{jobCount} Jobs Found</h2>
        </div>
        <div id="line"></div>
        {jobData && jobData.jobs ? (
          jobData.jobs
            .filter((val) => {
              if (
                categoryFilter == "" &&
                duration === "" &&
                searchInput === ""
              ) {
                return val;
              } else if (
                ((val &&
                  val.title &&
                  val.title
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) ||
                  (val &&
                    val.description &&
                    val.description
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()))) &&
                val &&
                val.developmentCate &&
                val.developmentCate
                  .toLowerCase()
                  .includes(categoryFilter.toLowerCase()) &&
                val &&
                val.duration &&
                val.duration.toLowerCase().includes(duration.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(
              ...(categoryFilter || duration || searchInput
                ? [0, jobData.jobs.length]
                : [0, count])
            )
            .map((data, index) => {
              const date =
                data && data.postedTime && moment(data.postedTime).fromNow();
              return (
                <div key={index}>
                  <div id="job">
                    {auth.currentUser.uid &&
                    data &&
                    data.submitFrom &&
                    data.submitFrom.includes(auth.currentUser.uid) ? (
                      <div className="submitted__tag">Submitted</div>
                    ) : null}
                    <h1 className="medium__text job__title">
                      {data.submitFrom &&
                      data.submitFrom.includes(auth.currentUser.uid) ? (
                        <strong className="grey">{data.title}</strong>
                      ) : (
                        <Link
                          to={`/Jobdetails/${data.title}`}
                          onClick={() => setJobDetail(data)}
                        >
                          <strong>{data.title}</strong>
                        </Link>
                      )}
                    </h1>
                    {data.description && (
                      <ReadMore maxCharacterCount={200}>
                        {data.description}
                      </ReadMore>
                    )}
                    <div className="job__listing__outer__flex">
                      <div id="flex">
                        <h2 className="small__text flex__align__center">
                          <strong>
                            <ImPriceTags />
                            Project Budget
                          </strong>
                        </h2>
                        <h2 className="small__text flex__align__center">
                          <strong>
                            <AiOutlineFieldTime />
                            Duration
                          </strong>
                        </h2>
                        <h2 className="small__text flex__align__center">
                          <strong>
                            <MdWork />
                            Proficiency
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
                      <strong>
                        Project Budget: ${data.rate} - Posted: {date && date}
                      </strong>
                    </h2>
                  </div>
                  <div id="line"></div>
                </div>
              );
            })
        ) : (
          <div className="no__job__found">No Jobs Found</div>
        )}
        {jobData.jobs.length < 6 || duration || categoryFilter ? null : (
          <div className="load__more__btn">
            <button onClick={() => setCount(count + 6)}>Load more</button>
          </div>
        )}
      </div>
    </>
  );
};

export default JobsListing;
