import { useState, useEffect } from "react";

// firebase
import { db } from "../firebase";

const useFreelancerById = (freelancerId) => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const ref = db.ref(`FreelancerUsers/${freelancerId}`);
    ref.on("value", (snapshot) => {
      setProfileData(snapshot.val());
    });
  }, [freelancerId]);

  return { profileData };
};

export default useFreelancerById;
