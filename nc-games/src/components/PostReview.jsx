import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postReview } from "../api";
import { User } from "../contexts/User";

const PostReview = ({ categories, isLoading }) => {
  const user = useContext(User);
  const navigate = useNavigate();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({});
  const [isInvalid, setIsInvalid] = useState(false);

  if (user === null) {
    return (
      <>
        <h2>You must be logged in to post a review</h2>
        <button id="comment-button" onClick={() => navigate("/")}>
          Log in
        </button>
      </>
    );
  }

  const handleChange = (event) => {
    setIsInvalid(false);
    event.target.classList.remove("invalid");
    if (event.target.id === "review_body") {
      event.target.nextElementSibling.innerText = "";
    }
    setForm((currentForm) => {
      return { ...currentForm, [event.target.id]: event.target.value };
    });
  };

  const checkForError = (field) => {
    if (field.value === undefined || field.value === "") {
      field.classList.add("invalid");
      field.placeholder = "Required Field";
      setIsInvalid(true);
    }
    if (field.id === "review_body" && field.value.length < 600) {
      field.nextElementSibling.innerText = `Your review is ${
        600 - field.value.length
      } characters too short`;
      setIsInvalid(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = [
      document.getElementById("review_body"),
      document.getElementById("title"),
      document.getElementById("category"),
    ];

    requiredFields.forEach((field) => {
      checkForError(field);
    });
    if (isInvalid) {
      event.target.firstElementChild.innerText =
        "Please complete all required fields";
      return;
    } else {
      setIsPosting(true);
      postReview({ ...form, owner: user.username })
        .then((review) => {
          setIsPosting(false);
          navigate(`/review/${review.review_id}`);
        })
        .catch((err) => {
          setIsPosting(false);
          setIsInvalid(false);
          if (err.response.status === 400) {
            event.target.firstElementChild.innerText =
              "Please complete all required fields";
          } else {
            event.target.firstElementChild.innerText =
              "Something went wrong, plase try again";
          }
        });
    }
  };

  const handleBlur = (event) => {
    checkForError(event.target);
  };
  return (
    <>
      <main id="post-review">
        <h2 id="post-review-heading">Post a review</h2>
        {isPosting ? <h3>Posting...</h3> : <></>}
        <form onSubmit={handleSubmit}>
          <span className="err"></span>
          <label className="label" htmlFor="title" onChange={handleChange}>
            Title(*)
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          <label className="label" htmlFor="designer">
            Game Designer
          </label>
          <input
            placeholder="Designer"
            id="designer"
            onChange={handleChange}
          ></input>
          <label className="label" htmlFor="img_url">
            Category(*)
          </label>
          <select
            id="category"
            defaultValue=""
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {isLoading ? (
              <option value="" disabled="disabled">
                Loading...
              </option>
            ) : (
              <>
                <option disabled value="" id="disabled-option">
                  Select a category
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.slug} value={category.slug}>
                      {category.slug}
                    </option>
                  );
                })}
              </>
            )}
          </select>
          <label className="label" htmlFor="review_img_url">
            Image
          </label>
          <input
            placeholder="URL"
            id="review_img_url"
            onChange={handleChange}
          ></input>
          <label className="label" htmlFor="review_body">
            Review(*)
          </label>
          <textarea
            placeholder="Body"
            id="review_body"
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>{" "}
          <span className="err"></span>
          <button type="submit">Post</button>
        </form>
      </main>
    </>
  );
};

export default PostReview;
