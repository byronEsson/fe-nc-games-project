const ListedReview = ({ review }) => {
  const dateString = `${review.created_at.slice(
    8,
    10
  )}-${review.created_at.slice(5, 7)}-${review.created_at.slice(0, 4)}`;
  console.log(review.created_at);
  const timeString = review.created_at.slice(11, 16);

  return (
    <li>
      <h3>{review.title}</h3>
      <label htmlFor="designed-by" className="label">
        Designed By
      </label>
      <label htmlFor="owner" className="label">
        Review By
      </label>
      <p className="designer">{review.designer}</p>
      <p className="owner">{review.owner}</p>
      <img
        className="review-img"
        alt={`image for the review ${review.title}`}
        src={review.review_img_url}
      />
      <label htmlFor="comments" className="label bottom">
        Comments
      </label>
      <label htmlFor="date" className="label bottom">
        Posted At
      </label>
      <label htmlFor="votes" className="label bottom">
        Votes
      </label>
      <p className="bottom">{review.comment_count}</p>{" "}
      <p className="bottom">
        {timeString} {dateString}
      </p>
      <p className="bottom">{review.votes}</p>
    </li>
  );
};

export default ListedReview;
