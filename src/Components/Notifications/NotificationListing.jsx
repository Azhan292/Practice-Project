import React from "react";
import "./notifications.style.css";

// icons
import { FaTimes } from "react-icons/fa";

// firebase
import useNotifications from "../../hooks/useNotifications";
import { auth } from "../../firebase";
import {
  updateNotificationReadStatus,
  deleteNotificationReadStatus,
} from "../../Apis/API.js";

const NotificationListing = () => {
  const { notifications, loading } = useNotifications(auth.currentUser.uid);

  const handleReadStatus = async (id) => {
    try {
      await updateNotificationReadStatus(auth.currentUser.uid, id);
    } catch (error) {
      alert("Error while updating, try again later");
    }
  };

  const handleDeleteStatus = async (id) => {
    try {
      await deleteNotificationReadStatus(auth.currentUser.uid, id);
    } catch (error) {
      alert("Error while updating, try again later");
    }
  };

  return (
    <div className="notifications__page">
      <h1>Notifications</h1>
      <div className="notification__list">
        {notifications && notifications.length > 0
          ? notifications.map((item, index) => {
              return (
                <div className="notification" key={index}>
                  <p>{item.notification}</p>
                  <button
                    className="delete__notification__btn"
                    onClick={() => handleDeleteStatus(item.id)}
                  >
                    <FaTimes />
                  </button>
                  {!item.read && (
                    <button
                      className="read__mark__btn"
                      onClick={() => handleReadStatus(item.id)}
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              );
            })
          : "Not Notifications to show"}
      </div>
    </div>
  );
};

export default NotificationListing;
