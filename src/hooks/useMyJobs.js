import { useEffect, useState } from "react";

// firebase
import { db, auth } from "../firebase";

const useMyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMyJobs([]);
    setLoading(true);
    const ref = db.ref(`Jobs`);
    const ref1 = db.ref(`Jobs/${auth.currentUser.uid}`);
    ref.on("value", (snapshot) => {
      if (snapshot.hasChild(auth.currentUser.uid)) {
        ref1.on("value", (snapshot) => {
          if (snapshot.val()) {
            setMyJobs(Object.values(snapshot.val()).reverse());
          }
          setLoading(false);
        });
      }
      setLoading(false);
    });
  }, []);

  return { myJobs, loading };
};

export default useMyJobs;
