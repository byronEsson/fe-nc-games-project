import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchReviewById } from "../api";
import Comments from "./Comments";
import Voter from "./Voter";
import NotFound from "./NotFound";

const SingleReview = () => {
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState();
  const [reqError, setReqError] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(review_id)
      .then((res) => {
        setReview(res);
        setIsLoading(false);
      })
      .catch(({ response: { status } }) => {
        setReqError(status);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : reqError === 404 ? (
    <NotFound type={"Review"} />
  ) : (
    <>
      <main className="single-review">
        <Link to={`/reviews/${review.category}`} id="single-review-link">
          {review.category.replaceAll("-", " ")}
        </Link>
        <Voter votes={review.votes} id={review_id} />
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
      </main>
      <Comments review_id={review_id} />
    </>
  );
};

export default SingleReview;
