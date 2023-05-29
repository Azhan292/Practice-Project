import { useEffect, useState } from "react";

// firebase
import { db } from "../firebase";

const useReviewsById = (document, document1, id) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews([]);
    const reviewRef = db.ref(`${document}/${id}`);
    reviewRef.once("value", (snapshot) => {
      if (snapshot.val() && snapshot.val().reviews) {
        Object.values(snapshot.val().reviews).forEach((review) => {
          const freelancerRef = db.ref(`${document1}/${review.from}`);
          freelancerRef.once("value", (snapshot) => {
            setReviews((prevState) => [
              ...prevState,
              {
                comment: review.comment,
                rating: review.rating,
                name: snapshot.val().name,
                profilePic: snapshot.val().profilePic,
              },
            ]);
          });
        });
      }
    });
  }, [id && document && document1]);

  return { reviews };
};

export default useReviewsById;
