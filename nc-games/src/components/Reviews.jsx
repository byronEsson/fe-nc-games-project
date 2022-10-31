import { useEffect } from "react";
import { useState } from "react";
import { fetchReviews } from "../api";
import ListedReview from "./ListedReview";

const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews().then((res) => {
      setReviews(res);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <ul>
      {reviews.map((review) => {
        return <ListedReview key={review.review_id} review={review} />;
      })}
    </ul>
  );
};

export default Reviews;
