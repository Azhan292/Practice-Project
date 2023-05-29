import React, { useState, useEffect } from "react";
import "./navbar.style.css";
import { Link, useHistory } from "react-router-dom";

// firebase
import { db, auth } from "../../firebase";

// redux
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../.././Redux/Actions/userActions";

// icons
import { AiOutlineBell, AiOutlineSetting, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowDown } from "react-icons/md";

// Logo image
import LogoImage from "../../Assets/Logo/logo.png";

const Navbar = ({ menu }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  const userType = useSelector((state) => state.userReducer.userType);
  const [toggle, setToggle] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [newNotification, setNewNotification] = useState(false);

  useEffect(() => {
    const checkRef = db.ref(`notifications`);
    const notificationRef = db.ref(`notifications/${auth.currentUser.uid}`);
    checkRef.on("value", (snapshot) => {
      if (snapshot.hasChild(auth.currentUser.uid)) {
        notificationRef.on("value", (snapshot) => {
          Object.values(snapshot.val()).forEach((val) => {
            if (!val.read) {
              setNewNotification(true);
            }
          });
        });
      }
    });
  }, []);

  return (
    <div className="navbar">
      <div className={profileMenu ? "profile__menu show" : "profile__menu"}>
        {userType === "Freelancer" ? (
          <li>
            <Link to="/sellerdashboard">Dashboard</Link>
          </li>
        ) : (
          <li>
            <Link to="/clientdashboard">Dashboard</Link>
          </li>
        )}
        <li>
          <Link to="/jobRequests">Job Requests</Link>
        </li>
        {userType === "Freelancer" ? (
          <li>
            <Link to="/Transactions">Transaction</Link>
          </li>
        ) : null}
        <li
          onClick={() => {
            auth.signOut();
            dispatch(removeUser());
            history.push("/signin");
          }}
        >
          Logout
        </li>
      </div>
      <div id="logo" className="large__text">
        <img src={LogoImage} alt="logo" />
      </div>
      {menu ? (
        <ul id="center__menu" className={toggle ? "show" : "hide"}>
          {userType === "Freelancer" ? (
            <li>
              <Link to="/Jobs">Find Work</Link>
            </li>
          ) : (
            ""
          )}
          {userType === "Client" ? (
            <li>
              <Link to="/Findtalent">Find Talent</Link>
            </li>
          ) : (
            ""
          )}
          {userType === "Client" ? (
            <li>
              <Link to="/Myjobs">My Jobs</Link>
            </li>
          ) : (
            ""
          )}
          {userType === "Client" ? (
            <li>
              <Link to="/AddProject">Post Job</Link>
            </li>
          ) : (
            ""
          )}
          {userType === "Freelancer" ? (
            <li>
              <Link to="/SubmittedProposals">Submitted</Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/Message">Message</Link>
          </li>
        </ul>
      ) : null}
      <ul id="right__menu">
        <li>
          <Link to="/notifications">
            <AiOutlineBell />
            {newNotification && <span className="read"></span>}
          </Link>
        </li>
        {!menu ? (
          <li>
            <AiOutlineSetting />
          </li>
        ) : null}
        <li className="nav__profile__pic">
          {user && user.profilePic ? (
            <img src={user.profilePic} alt="user" />
          ) : (
            <CgProfile />
          )}
        </li>
        <li
          id="flex"
          className="profile"
          onClick={() => setProfileMenu(!profileMenu)}
        >
          <p>{user && user.name && user.name}</p>
          <MdKeyboardArrowDown />
        </li>
        {menu ? (
          <li className="toggle" onClick={() => setToggle(!toggle)}>
            <AiOutlineMenu />
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Navbar;
