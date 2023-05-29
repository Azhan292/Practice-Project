import { useEffect, useState } from "react";

// firebase
import { db, auth } from "../firebase";

const useJobRequests = (userType) => {
  const [jobRequests, setJobRequests] = useState([]);

  useEffect(() => {
    if (userType === "Freelancer") {
      const receiveRef = db.ref(`receiveRequest/${auth.currentUser.uid}`);
      receiveRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          setJobRequests(Object.values(snapshot.val()).reverse());
        } else setJobRequests([]);
      });
    } else if (userType === "Client") {
      const sendRef = db.ref(`sendRequest/${auth.currentUser.uid}`);
      sendRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          setJobRequests(Object.values(snapshot.val()).reverse());
        } else setJobRequests([]);
      });
    }
  }, [userType]);

  return { jobRequests };
};

export default useJobRequests;
