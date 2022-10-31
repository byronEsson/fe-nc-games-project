import axios from "axios";

const myApi = axios.create({
  baseURL: "https://byrons-backend-project.herokuapp.com/api",
});

export const fetchReviews = (query) => {
  return myApi
    .get(`/reviews${query}`)
    .then(({ data: { reviews } }) => {
      return reviews;
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
