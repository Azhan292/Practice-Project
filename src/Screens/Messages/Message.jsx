import React, { useState, useEffect } from "react";
import "./message.style.css";

// Components
import Navbar from "../../Components/Headers/Navbar";
import Footer from "../../Components/Footer/Footer";
import AllMessages from "../../Components/Message/AllMessages";
import Chat from "../../Components/Message/Chat";

// firebase
import useMessageIds from "../../hooks/useMessageIds";
import useAllChatNames from "../../hooks/useAllChatNames";

// redux
import { useSelector } from "react-redux";

const Message = () => {
  const { idArr, projectIdArr, projectNames, createdAt } = useMessageIds();
  const [selectedName, setSelectedName] = useState({});
  const user = useSelector((state) => state.userReducer);
  const [sortedNames, setSortedNames] = useState([]);
  const { names, loading } = useAllChatNames(
    idArr,
    projectIdArr,
    projectNames,
    user.userType,
    createdAt
  );

  // useEffect(async () => {
  //   console.log("3", names);
  //   let isMounted = true;
  // const sort = names.sort(function compare(a, b) {
  //   var dateA = new Date(a.createdAt);
  //   var dateB = new Date(b.createdAt);
  //   return dateB - dateA;
  // });

  //   if (isMounted) {
  //     setSortedNames(sort);
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [names.length, createdAt]);

  return (
    <div className="page">
      <Navbar menu={true} />
      <div className="message__area">
        <div className="container msg__box">
          <AllMessages
            idArr={idArr}
            projectIdArr={projectIdArr}
            projectNames={projectNames}
            setSelectedName={setSelectedName}
            createdAt={createdAt}
            names={names}
            loading={loading}
          />
          <Chat selectedName={selectedName} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Message;
