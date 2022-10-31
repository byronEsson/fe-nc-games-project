import axios from "axios";

const myApi = axios.create({
  baseURL: "https://byrons-backend-project.herokuapp.com/api",
});

export const fetchReviews = () => {
  return myApi.get("/reviews").then(({ data: { reviews } }) => {
    return reviews;
  });
};

export const fetchReviewById = (id) => {
  return myApi.get(`/reviews/${id}`).then(({ data: { review } }) => {
    return review;
  });
};
