import { useNavigate } from "react-router-dom";

const CommentLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <form
        id="comment-form"
        onSubmit={() => {
          navigate("/");
        }}
      >
        <textarea placeholder="You must log in to leave a comment"></textarea>
        <button id="comment-button">Log in</button>
      </form>
    </>
  );
};

export default CommentLogin;
