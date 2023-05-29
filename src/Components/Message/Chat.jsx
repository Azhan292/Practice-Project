import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./chat.style.css";

// redux
import { useSelector } from "react-redux";

// svg
import ChatImg from "../../Assets/SVG/chat.svg";
import ClientProfile from "../../Assets/SVG/chat-client-profile-img.svg";
import FreelancerProfile from "../../Assets/SVG/chat-freelancer-profile-img.svg";
import { FiSend } from "react-icons/fi";

// firebase
import { auth } from "../../firebase";
import { sendChatMessage } from "../../Apis/API";
import useChat from "../../hooks/useChat";

const Chat = ({ selectedName }) => {
  const messagesEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const { user, userType } = useSelector((state) => state.userReducer);
  const { msgs } = useChat(selectedName);

  const handleChat = (e) => {
    e.preventDefault();
    if (msg) {
      try {
        sendChatMessage(msg, selectedName);
        setMsg("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function scrollToBottom() {
    if (document.getElementById("chat__list")) {
      let messages = document.getElementById("chat__list");
      messages.scrollTop = messages.scrollHeight;
    }
  }
  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  return (
    <div className="chat">
      <div className="header">
        {userType === "Client" && selectedName.id ? (
          <div className="menu__dots">
            <button>
              <Link
                to={`/PlaceOrder/${selectedName.id}/${selectedName.projectId}`}
              >
                Hire Freelancer
              </Link>
            </button>
          </div>
        ) : null}
        {selectedName.id ? (
          <>
            <h1 className="medium__text">
              <strong>{selectedName.name}</strong>
              <span>
                Time:{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </h1>
            <h2 className="small__text">
              {!selectedName.projectName.includes("Cover Letter :")
                ? selectedName.projectName
                : "Direct Project"}
            </h2>
          </>
        ) : (
          <h1 className="medium__text">
            <strong>Select a conversation !</strong>
          </h1>
        )}
      </div>
      <div className="flex">
        <div className="chat__area">
          {msgs && msgs.length > 0 ? (
            <>
              <div className="chat__list" id="chat__list">
                {msgs ? (
                  msgs.map((chatMsg, index) => {
                    if (chatMsg.msg) {
                      return chatMsg.from === auth.currentUser.uid ? (
                        <div className="chat__msg right" key={index}>
                          <div>
                            <h3 className="small__text">{chatMsg.msg}</h3>
                            <span>
                              <sub>
                                {moment(chatMsg.createdAt).format("h:mm a")}
                              </sub>
                            </span>
                          </div>
                          <img
                            src={
                              user.profilePic
                                ? user.profilePic
                                : FreelancerProfile
                            }
                            alt="freelancer"
                          />
                        </div>
                      ) : (
                        <div className="chat__msg left" key={index}>
                          <img
                            src={
                              selectedName.profilePic
                                ? selectedName.profilePic
                                : ClientProfile
                            }
                            alt="client"
                          />
                          <div>
                            <h3 className="small__text">{chatMsg.msg}</h3>
                            <span>
                              <sub>
                                {moment(chatMsg.createdAt).format("h:mm a")}
                              </sub>
                            </span>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="no__msg">Start a Conversation Now</div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="input__area">
                <form onSubmit={handleChat}>
                  <input
                    type="text"
                    id="msg"
                    placeholder="Type Message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                  <br />
                  <button id="send" type="submit">
                    <FiSend />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="start__chat">
              <img src={ChatImg} alt="chat" />
              <h1 className="no__msg">Start a chat now</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
