import { useEffect, useState } from "react";

// firebase
import { db } from "../firebase";

const useNotifications = (id) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNotifications([]);
    setLoading(true);
    const ref = db.ref(`notifications`);
    const ref1 = db.ref(`notifications/${id}`);
    ref.on("value", (snapshot) => {
      if (snapshot.hasChild(id)) {
        ref1.on("value", (snapshot) => {
          if (snapshot.val()) {
            setNotifications(Object.values(snapshot.val()));
          }
          setLoading(false);
        });
      }
      setLoading(false);
    });
  }, [id]);

  return { notifications, loading };
};

export default useNotifications;
