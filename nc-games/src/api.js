import axios from "axios";

const myApi = axios.create({
  baseURL: "https://byrons-backend-project.herokuapp.com/api",
});

export const fetchReviews = (query) => {
  return myApi
    .get(`/reviews${query}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const fetchCategories = () => {
  return myApi.get(`/categories`).then(({ data: { categories } }) => {
    return categories;
  });
};

export const fetchReviewById = (id) => {
  return myApi.get(`/reviews/${id}`).then(({ data: { review } }) => {
    return review;
  });
};

export const patchVotes = (id, votes) => {
  return myApi.patch(`/reviews/${id}`, votes).then(({ data: { review } }) => {
    return review;
  });
};

export const fetchCommentsByReview = (id) => {
  return myApi.get(`/reviews/${id}/comments`).then(({ data: { comments } }) => {
    return comments;
  });
};

export const postComment = (id, comment) => {
  return myApi
    .post(`reviews/${id}/comments`, comment)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteComment = (id) => {
  return myApi.delete(`/comments/${id}`).then(({ status }) => {
    return status;
  });
};

export const patchCommentVotes = (id, votes) => {
  return myApi
    .patch(`/comments/${id}`, votes)
    .then(({ status }) => {
      return status;
    })
    .catch((err) => console.log(err));
};
