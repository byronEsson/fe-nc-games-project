import { useState } from "react";
import { patchCommentVotes, patchVotes } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const Voter = ({ votes, id, isComment }) => {
  const [increment, setIncrement] = useState(0);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(0);

  const handleClasses = (event, err) => {
    const thisButton = event.target.children[0];
    const likeButton = event.target.parentElement.children[0].children[0];
    const disLikeButton = event.target.parentElement.children[3].children[0];

    if (!err) {
      if (isLiked === 0) {
        thisButton.classList.add(event.target.name);
      }
      if (isLiked === -1) {
        disLikeButton.classList.remove("minus");
      }
      if (isLiked === 1) {
        likeButton.classList.remove("plus");
      }
    } else {
      if (isLiked === 0) {
        thisButton.classList.remove(event.target.name);
      }
      if (isLiked === -1) {
        disLikeButton.classList.add("minus");
      }
      if (isLiked === 1) {
        likeButton.classList.add("plus");
      }
    }
  };

  const handleType = (id, votes, isComment) => {
    if (isComment) return patchCommentVotes(id, votes);
    return patchVotes(id, votes);
  };

  const handleClick = (event) => {
    const change = parseFloat(event.target.value);
    if (isLiked === 1 && change === 1) {
      return;
    } else if (isLiked === -1 && change === -1) {
      return;
    }

    handleClasses(event);
    setIncrement((currInc) => currInc + change);
    setIsLiked((current) => current + change);

    setError(null);
    return handleType(id, { inc_votes: change }, isComment).catch((err) => {
      if (err) {
        setIncrement((currInc) => currInc - change);
        setIsLiked((current) => current - change);
        setError("Something went wrong, please try again");
        handleClasses(event, err);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    });
  };

  return (
    <section className="votes">
      <button value={1} name="plus" onClick={handleClick}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <p>{votes + increment}</p>
      <span id="err">{error}</span>
      <button value={-1} name="minus" onClick={handleClick}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </section>
  );
};
export default Voter;
