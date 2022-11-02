import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByReview } from "../api";
import { User } from "../contexts/User";
import Comment from "./Comment";
import CommentLogin from "./CommentLogin";
import LeaveAComment from "./LeaveAComment";

const Comments = () => {
  const user = useContext(User);
  const { review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsByReview(review_id).then((res) => {
      setComments(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <section id="comments">
      <h3>Comments</h3>
      {user === null ? <CommentLogin /> : <LeaveAComment />}
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
};

export default Comments;
