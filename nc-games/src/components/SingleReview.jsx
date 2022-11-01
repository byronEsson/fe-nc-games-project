import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchReviewById } from "../api";
import Comments from "./Comments";

const SingleReview = () => {
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(review_id).then((res) => {
      setReview(res);
      setIsLoading(false);
      const dateString = `${review.created_at.slice(
        8,
        10
      )}-${review.created_at.slice(5, 7)}-${review.created_at.slice(0, 4)}`;

      const timeString = review.created_at.slice(11, 16);

      setDate(`${timeString} ${dateString}`);
    });
  }, []);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <main className="single-review">
        <Link to={`/reviews/${review.category}`} id="single-review-link">
          {review.category.replaceAll("-", " ")}
        </Link>
        <h2>{review.title}</h2>
        <p className="label">Reviewed by: {review.owner}</p>
        <p className="label">{`${review.created_at.slice(
          8,
          10
        )}-${review.created_at.slice(5, 7)}-${review.created_at.slice(
          0,
          4
        )} at ${review.created_at.slice(11, 16)}`}</p>
        <img
          className="review-img"
          alt={`${review.title}`}
          src={review.review_img_url}
        />
        <p id="review-body">{review.review_body}</p>

        <p className="votes">Votes: {review.votes}</p>
      </main>
      <Comments review_id={review_id} />
    </>
  );
};

export default SingleReview;
