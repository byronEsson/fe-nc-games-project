const Comment = ({ comment }) => {
  return (
    <article className="comment">
      <h5>{comment.author}</h5>
      <p>{comment.body}</p>
      <p className="label">{`${comment.created_at.slice(
        8,
        10
      )}-${comment.created_at.slice(5, 7)}-${comment.created_at.slice(
        0,
        4
      )} at ${comment.created_at.slice(11, 16)}`}</p>
    </article>
  );
};

export default Comment;
