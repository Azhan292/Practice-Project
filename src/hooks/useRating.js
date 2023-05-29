import { useEffect, useState } from "react";

const useRating = (reviews) => {
  const [rating, setRating] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(null);

  useEffect(() => {
    var ratingCount = 0;
    if (reviews) {
      Object.values(reviews).forEach((review) => {
        ratingCount += review.rating;
      });
      ratingCount = ratingCount / Object.values(reviews).length;
      setRating(ratingCount);
      setReviewsCount(Object.values(reviews).length);
    }
  }, [reviews]);

  return { rating, reviewsCount };
};

export default useRating;
