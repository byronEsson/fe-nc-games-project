import axios from "axios";

const myApi = axios.create({
  baseURL: "https://byrons-backend-project.herokuapp.com/api",
});

export const fetchReviews = (query) => {
  return myApi.get(`/reviews${query}`).then(({ data: { reviews } }) => {
    return reviews;
  });
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

export const fetchUser = (username) => {
  return myApi.get(`/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};
