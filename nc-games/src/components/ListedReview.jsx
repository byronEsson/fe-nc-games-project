const ListedReview = ({ review }) => {
  return (
    <li>
      <h3>{review.title}</h3>
      <label htmlFor="designed-by" className="label">
        Designed By
      </label>{" "}
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
    </li>
  );
};

export default ListedReview;
