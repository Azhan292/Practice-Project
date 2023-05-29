import { useEffect, useState } from "react";

// firebase
import { db } from "../firebase";

const useReviews = (user, document) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      setReviews([]);
      if (user.reviews) {
        Object.values(user.reviews).forEach(async (review) => {
          const ref = db.ref(`${document}/${review.from}`);
          await ref.once("value", (snapshot) => {
            setReviews((prevState) => [
              ...prevState,
              {
                comment: review.comment,
                rating: review.rating,
                buyerName: snapshot.val().name,
                image: snapshot.val().profilePic,
              },
            ]);
          });
        });
      }
    };

    getReviews();
  }, [user && document]);

  return { reviews };
};

export default useReviews;
