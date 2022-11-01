import { useState } from "react";
import { patchVotes } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const Voter = ({ votes, id }) => {
  const [increment, setIncrement] = useState(0);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(0);

  const handleClasses = (event, err) => {
    if (!err) {
      if (isLiked === 0) {
        event.target.children[0].classList.add(event.target.name);
      }
      if (isLiked === -1) {
        event.target.parentElement.children[3].children[0].classList.remove(
          "minus"
        );
      }
      if (isLiked === 1) {
        event.target.parentElement.children[0].children[0].classList.remove(
          "plus"
        );
      }
    } else {
      if (isLiked === 0) {
        event.target.children[0].classList.remove(event.target.name);
      }
      if (isLiked === -1) {
        event.target.parentElement.children[3].children[0].classList.add(
          "minus"
        );
      }
      if (isLiked === 1) {
        event.target.parentElement.children[0].children[0].classList.add(
          "plus"
        );
      }
    }
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
    return patchVotes(id, { inc_votes: change })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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