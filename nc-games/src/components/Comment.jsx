import DeleteButton from "./DeleteButton";
import { useEffect } from "react";
import { useContext } from "react";
import { User } from "../contexts/User";
import { useState } from "react";
import Voter from "./Voter";

const Comment = ({ comment }) => {
  const user = useContext(User);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    if (comment.author === user.username) {
      setIsAuthor(true);
    }
  }, []);
  return isDeleted ? (
    <article className="comment">
      <p className="label">Comment deleted</p>
    </article>
  ) : (
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
      <Voter id={comment.comment_id} votes={comment.votes} isComment={true} />
      {isAuthor ? (
        <DeleteButton
          id={comment.comment_id}
          owner={comment.author}
          setIsDeleted={setIsDeleted}
        />
      ) : (
        <></>
      )}
    </article>
  );
};

export default Comment;
