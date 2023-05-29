import React from "react";
import { Link } from "react-router-dom";
import "./rightbar.style.css";

// redux
import { useSelector } from "react-redux";

// icons
import { AiFillEye } from "react-icons/ai";
import { BiUserPin } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { MdWork } from "react-icons/md";

const RightBar = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="right__side__bar small">
      <div className="profile">
        <img src={user && user.profilePic && user.profilePic} alt="user" />
      </div>
      <table>
        <tbody>
          <tr>
            <th>
              <BiUserPin />
            </th>
            <th>
              <Link to="/sellerdashboard">View Profile</Link>
            </th>
          </tr>
          <tr>
            <th>
              <FaHistory />
            </th>
            <th>Recent Proposals</th>
          </tr>
          <tr>
            <th>
              <AiFillEye />
            </th>
            <th>
              <Link to="/SubmittedProposals">View Proposals</Link>
            </th>
          </tr>
          <tr>
            <th>
              <MdWork />
            </th>
            <th>Job Requests</th>
          </tr>
          <tr>
            <th>
              <AiFillEye />
            </th>
            <th>
              <Link to="/jobRequests">View Requests</Link>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RightBar;
