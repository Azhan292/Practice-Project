import { useEffect, useState } from "react";

// firebase
import { db, auth } from "../firebase";

const useChat = (selectedName) => {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const ref = db.ref("messages");
    const ref1 = db.ref(
      `messages/${auth.currentUser.uid}/${selectedName.id}/${selectedName.projectId}`
    );
    ref.on("value", (snapshot) => {
      if (snapshot.hasChild(auth.currentUser.uid)) {
        ref1.on("value", (snapshot) => {
          if (snapshot.val()) {
            setMsgs(Object.values(snapshot.val()));
          }
        });
      }
    });
  }, [selectedName.projectId]);

  return { msgs };
};

export default useChat;
