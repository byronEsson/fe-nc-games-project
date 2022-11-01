import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByReview } from "../api";
import Comment from "./Comment";

const Comments = () => {
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

  return isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <section id="comments">
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
};

export default Comments;
