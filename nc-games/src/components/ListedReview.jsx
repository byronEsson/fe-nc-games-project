import { Link } from "react-router-dom";

const ListedReview = ({ review }) => {
  const dateString = `${review.created_at.slice(
    8,
    10
  )}-${review.created_at.slice(5, 7)}-${review.created_at.slice(0, 4)}`;

  const timeString = review.created_at.slice(11, 16);

  return (
    <Link to={`/review/${review.review_id}`}>
      <li>
        <h3>{review.title}</h3>
        <label htmlFor="designed-by" className="label left">
          Designed By
        </label>
        <label htmlFor="owner" className="label right">
          Review By
        </label>
        <p className="designer left">{review.designer}</p>
        <p className="owner right">{review.owner}</p>
        <img
          className="review-img"
          alt={`${review.title}`}
          src={review.review_img_url}
        />
        <label htmlFor="comments" className="label bottom ">
          Comments
        </label>
        <label htmlFor="date" className="label bottom ">
          Posted At
        </label>
        <label htmlFor="votes" className="label bottom ">
          Votes
        </label>
        <p className="bottom ">{review.comment_count}</p>{" "}
        <p className="bottom ">
          {timeString} {dateString}
        </p>
        <p className="bottom ">{review.votes}</p>
      </li>
    </Link>
  );
};

export default ListedReview;
