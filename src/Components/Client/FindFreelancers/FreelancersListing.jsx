import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./freelancerslisting.style.css";

// components
import SearchInput from "../../TextInputs/SearchInput";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setFreelancers,
  selectedFreelancer,
  removeSelectedFreelancer,
} from "../../../Redux/Actions/freelancersActions";

// firebase
import { db } from "../../../firebase";
import { freelancerEarnings } from "../../../Apis/API";

// loading
import Loading from "../../../Screens/Loader/Loading";

// icons
import { FcBusinessman } from "react-icons/fc";
import { FiRefreshCw } from "react-icons/fi";

const FreelancersListing = ({
  handleModal,
  freelancerLevel,
  freelancerCategory,
  setFreelancerLevel,
  setFreelancerCategory,
}) => {
  const dispatch = useDispatch();
  const freelancerData = useSelector((state) => state.freelancersReducer);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(6);
  const [disabled, setDisabled] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [search, setSearch] = useState("");
  const [checkForLoadmore, setCheckForLoadmore] = useState(false);

  const getAllUsers = async () => {
    setFreelancerLevel("");
    setFreelancerCategory("");
    setCount(6);
    setLoading(true);
    setDisabled(false);
    setCheckForLoadmore(true);
    dispatch(removeSelectedFreelancer());
    const allusers = db.ref("FreelancerUsers");
    await allusers.once("value", (snapshot) => {
      if (snapshot.val()) {
        dispatch(setFreelancers(Object.values(snapshot.val())));
      }
      setLoading(false);
    });
  };

  const handleSearch = async () => {
    if (search) {
      const allusers = db
        .ref("FreelancerUsers")
        .orderByChild("email")
        .equalTo(search);
      await allusers.once("value", (snapshot) => {
        if (snapshot.val()) {
          dispatch(setFreelancers(Object.values(snapshot.val())));
          setCheckForLoadmore(false);
        }
        setSearch("");
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const setFreelancerDetail = (data) => {
    dispatch(selectedFreelancer(data));
  };

  return loading ? (
    <div className="loading">
      <Loading />
    </div>
  ) : (
    <div className="freelancer__listings__sec">
      <button className="refresh" onClick={getAllUsers}>
        <FiRefreshCw />
      </button>
      <div id="input">
        <SearchInput
          type={"text"}
          placeholder={"Search"}
          handleChange={(e) => setSearch(e.target.value)}
          handleSearch={handleSearch}
          value={search}
        />
        <div>
          <h2 className="small__text" onClick={handleModal}>
            Advance Filters
          </h2>
        </div>
      </div>

      <div id="line"></div>
      <div className="freelancers">
        {freelancerData &&
          freelancerData.freelancers &&
          freelancerData.freelancers
            .filter((val) => {
              console.log(freelancerData.freelancers);
              if (
                freelancerLevel == "" &&
                freelancerCategory === "" &&
                search === ""
              ) {
                return val;
              } else if (
                ((val &&
                  val.name &&
                  val.name.toLowerCase().includes(search.toLowerCase())) ||
                  (val &&
                    val.personalInfo &&
                    val.personalInfo.developmentCate &&
                    val.personalInfo.developmentCate
                      .toLowerCase()
                      .includes(search.toLowerCase()))) &&
                val &&
                val.personalInfo &&
                val.personalInfo.developmentCate &&
                val.personalInfo.developmentCate
                  .toLowerCase()
                  .includes(freelancerCategory.toLowerCase()) &&
                val &&
                val.personalInfo &&
                val.personalInfo.experienceLevel &&
                val.personalInfo.experienceLevel
                  .toLowerCase()
                  .includes(freelancerLevel.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(
              ...(freelancerLevel || freelancerCategory
                ? [0, freelancerData.freelancers.length]
                : [0, count])
            )
            .map((data, index) => {
              return (
                <div key={index}>
                  <div id="freelancer">
                    <div id="intro">
                      <div id="profile__img">
                        {data && data.profilePic ? (
                          <img src={data.profilePic} alt="freelancer" />
                        ) : (
                          <FcBusinessman />
                        )}
                      </div>
                      <div>
                        <h1 className="medium__text">
                          <Link
                            to={
                              data.id
                                ? `/Freelancer/${data.id}`
                                : `/Freelancer/${data.name}`
                            }
                            onClick={() => setFreelancerDetail(data)}
                          >
                            <strong>{data.name && data.name}</strong>
                          </Link>
                        </h1>
                        <h2 className="small__text">
                          {data.personalInfo &&
                          data.personalInfo.developmentCate
                            ? data.personalInfo.developmentCate
                            : "No Category"}
                        </h2>
                        <span>
                          {data.personalInfo && data.personalInfo.country
                            ? data.personalInfo.country
                            : "No Country"}
                        </span>
                      </div>
                    </div>
                    <div id="flex">
                      <h2 className="small__text">
                        <span>$ {freelancerEarnings(data.id)}</span>
                      </h2>
                      <h2 className="small__text success">
                        {console.log(data.reviews)}
                        {data.reviews && Object.values(data.reviews).length > 0
                          ? `${Object.values(data.reviews).length} reviews`
                          : "0 reviews"}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      {freelancerData.freelancers.length > 6 &&
      !freelancerLevel &&
      !freelancerCategory ? (
        <div className="load__more__btn">
          <button onClick={() => setCount(count + 6)}>Load more</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FreelancersListing;
