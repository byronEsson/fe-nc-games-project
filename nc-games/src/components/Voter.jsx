
import { useState } from "react";
import { patchVotes } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const Voter = ({ votes, id }) => {
  const [increment, setIncrement] = useState(0);
  const [error, setError] = useState(null);

  const handleClick = (event) => {
    const change = parseFloat(event.target.value);


    setIncrement((currInc) => currInc + change);
    setError(null);
    return patchVotes(id, { inc_votes: change })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err) {
          setIncrement((currInc) => currInc - change);
          setError("Something went wrong, please try again");
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      });
  };

  return (
    <section className="votes">
      <button value={1} onClick={handleClick}>
        +
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <p>{votes + increment}</p>
      <span id="err">{error}</span>
      <button value={-1} onClick={handleClick}>
        -
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </section>
  );
};
export default Voter;
