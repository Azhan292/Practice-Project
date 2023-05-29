import { useState, useEffect } from "react";

// firebase
import { db } from "../firebase";

const useClientById = (clientId) => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const ref = db.ref(`ClientUsers/${clientId}`);
    ref.on("value", (snapshot) => {
      setProfileData(snapshot.val());
    });
  }, [clientId]);

  return { profileData };
};

export default useClientById;
