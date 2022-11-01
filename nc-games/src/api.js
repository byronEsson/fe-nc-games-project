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
