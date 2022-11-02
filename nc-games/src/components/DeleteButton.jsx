import { useState } from "react";

import { deleteComment } from "../api";

const DeleteButton = ({ id, setIsDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setIsDeleting(true);
    event.target.disabled = true;
    event.target.innerText = "Deleting";
    deleteComment(id).then((res) => {
      setIsDeleted(true);
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      {isDeleting ? "Deleting" : "Delete"}
    </button>
  );
};
export default DeleteButton;
