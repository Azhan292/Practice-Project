import { useState, useEffect } from "react";

// firebase
import { db, auth } from "../firebase";

const useClientLocation = () => {
  const [clientCountry, setClientCountry] = useState("");
  const [clientCity, setClientCity] = useState("");
  useEffect(() => {
    const clientRef = db.ref().child("ClientUsers").child(auth.currentUser.uid);
    clientRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().city) {
          setClientCity(snapshot.val().city);
        }
        if (snapshot.val().country) {
          setClientCountry(snapshot.val().country);
        }
      }
    });
  }, []);

  return { clientCity, clientCountry };
};

export default useClientLocation;
