import { useState, useEffect } from "react";

// firebase
import { db } from "../firebase";

const useAllChatNames = (
  idArr,
  projectIdArr,
  projectNames,
  type,
  createdAt
) => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");
  let count = 0;

  useEffect(() => {
    setNames([]);
    if (type === "Freelancer") {
      setUserType("Client");
    } else if (type === "Client") {
      setUserType("Freelancer");
    }
    setLoading(true);
    for (let i = 0; i < idArr.length; i++) {
      if (projectIdArr[i] && idArr[i]) {
        const ref = db.ref(`${userType}Users/${idArr[i]}`);
        ref.on("value", (snapshot) => {
          if (snapshot.val() && snapshot.val().name) {
            count++;
            setNames((names) => [
              ...names,
              {
                id: idArr[i],
                projectId: projectIdArr[i],
                projectName: projectNames[i],
                createdAt: createdAt[i],
                name: snapshot.val().name,
                profilePic: snapshot.val().profilePic,
              },
            ]);
          }
        });
      }
    }
    setLoading(false);
  }, [idArr && projectIdArr && projectNames]);

  return { names, loading };
};

export default useAllChatNames;
