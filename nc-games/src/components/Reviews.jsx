import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../api";
import ListedReview from "./ListedReview";

const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    let query = "";

    if (category) {
      query = `?category=${category}`;
    }
    fetchReviews(query).then((res) => {
      setReviews(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {category ? (
        <h2>{category.replaceAll("-", " ")}</h2>
      ) : (
        <h2>All Reviews</h2>
      )}
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {reviews.map((review) => {
            return <ListedReview key={review.review_id} review={review} />;
          })}
        </ul>
      )}
    </>
  );
};

export default Reviews;
