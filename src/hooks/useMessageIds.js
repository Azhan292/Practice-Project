import { useEffect, useState } from "react";

// firebase
import { db, auth } from "../firebase";

const useMessageIds = () => {
  const [idArr, setIdArr] = useState([]);
  const [projectIdArr, setProjectIdArr] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [createdAt, setCreatedAt] = useState([]);

  useEffect(() => {
    const data = [];
    const projectIds = [];
    const projectName = [];
    const createdAt = [];
    const ref = db.ref(`messages`);
    const ref1 = db.ref(`messages/${auth.currentUser.uid}`);
    ref.on("value", async (snapshot) => {
      if (snapshot.hasChild(auth.currentUser.uid)) {
        ref1.on("value", async (snapshot) => {
          snapshot.forEach((child) => {
            const ref2 = db.ref(
              `messages/${auth.currentUser.uid}/${child.key}`
            );
            ref2.on("value", async (snapshot) => {
              snapshot.forEach((childs) => {
                db.ref(
                  `messages/${auth.currentUser.uid}/${child.key}/${childs.key}`
                )
                  .child("from")
                  .on("value", (snapshots) => {
                    data.push(snapshots.val());
                  });
                db.ref(
                  `messages/${auth.currentUser.uid}/${child.key}/${childs.key}`
                )
                  .child("projectId")
                  .on("value", (snapshots) => {
                    projectIds.push(snapshots.val());
                  });
                db.ref(
                  `messages/${auth.currentUser.uid}/${child.key}/${childs.key}`
                )
                  .child("projectName")
                  .on("value", (snapshots) => {
                    projectName.push(snapshots.val());
                  });
                db.ref(
                  `messages/${auth.currentUser.uid}/${child.key}/${childs.key}`
                )
                  .child("createdAt")
                  .on("value", (snapshots) => {
                    createdAt.push(snapshots.val());
                  });
              });
            });
          });
        });
        setIdArr(data);
        setProjectIdArr(projectIds);
        setProjectNames(projectName);
        setCreatedAt(createdAt);
      }
    });
  }, []);

  return { idArr, projectIdArr, projectNames, createdAt };
};

export default useMessageIds;
