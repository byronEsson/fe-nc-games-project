import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import { User } from "../contexts/User";
import Comment from "./Comment";

const LeaveAComment = () => {
  const { review_id } = useParams();
  const { username } = useContext(User);
  const [commentContent, setCommentContent] = useState("");
  const [err, setErr] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [newComment, setNewComment] = useState([]);
  const [hasNewComment, setHasNewComment] = useState(false);

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErr(null);
    if (commentContent.length <= 2) {
      setErr("Your comment is too short");
      setTimeout(() => {
        setErr(null);
      }, 3400);
    } else {
      setHasNewComment(true);
      setIsPosting(true);
      postComment(review_id, { username, comment: commentContent })
        .then((res) => {
          setNewComment((current) => [res, ...current]);
          setIsPosting(false);
        })
        .catch((err) => {
          setErr("Something went wrong, please try again");
          setCommentContent("");
          setTimeout(() => {
            setErr(null);
          }, 3400);
          setIsPosting(false);
        });
    }
  };
  return (
    <>
      <form id="comment-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave a comment"
          value={commentContent}
          onChange={handleChange}
          minLength="10"
        ></textarea>
        <span>{err}</span>
        <button id="comment-button">Comment</button>
      </form>
      {!hasNewComment ? (
        <></>
      ) : isPosting ? (
        <h6>Posting...</h6>
      ) : (
        newComment.map((comment) => {
          return <Comment key={comment.comment_id} comment={comment} />;
        })
      )}
    </>
  );
};

export default LeaveAComment;
