import React, { useEffect, useState } from "react";
import "./allmessages.style.css";

// components
import Loading from "../../Screens/Loader/Loading";

// images
import ProfileImage from "../../Assets/SVG/chat-client-profile-img.svg";

const AllMessages = ({ setSelectedName, names, loading }) => {
  const [searchName, setSearchName] = useState("");

  const sortedNames = names.sort(function compare(a, b) {
    var dateA = new Date(a.createdAt);
    var dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <div className="all__msgs">
      <div className="header">
        <h1 className="large__text">All Conversations</h1>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="msg__list">
          <input
            className="msg__search__field"
            type="text"
            placeholder="Type to Search"
            onChange={(e) => setSearchName(e.target.value)}
          />
          {sortedNames &&
            sortedNames
              .filter((val) => {
                if (searchName == "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchName.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((name, index) => {
                return (
                  <div
                    className="msg"
                    key={index}
                    onClick={() =>
                      setSelectedName({
                        id: name.id,
                        name: name.name,
                        projectId: name.projectId,
                        projectName: name.projectName,
                        profilePic: name.profilePic,
                      })
                    }
                  >
                    <div className="profile__img">
                      <img
                        src={
                          name && name.profilePic
                            ? name.profilePic
                            : ProfileImage
                        }
                        alt="profile"
                      />
                    </div>
                    <div>
                      <h2 className="small__text">
                        <strong>{name.name}</strong>
                      </h2>
                      <span className="small__text">
                        {name.projectName.length > 15
                          ? name.projectName.slice(0, 15) + "..."
                          : name.projectName}
                      </span>
                    </div>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default AllMessages;
