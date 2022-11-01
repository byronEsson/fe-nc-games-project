import { useEffect } from "react";
import { useState } from "react";
import {
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { fetchReviews } from "../api";
import ListedReview from "./ListedReview";
import NotFound from "./NotFound";

const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sorter, setSorter] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [searchQueries, setSearchQueries] = useSearchParams();
  const [reqError, setReqError] = useState(null);

  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setReqError(null);
    let query = "";
    const sort_by = searchQueries.get("sort_by");
    const order_by = searchQueries.get("order");
    if (sort_by && order_by) {
      query = `?sort_by=${sort_by}&order=${order_by}`;
    }

    if (category) {
      query += sort_by ? "&" : "?";
      query += `category=${category}`;
    }

    fetchReviews(query)
      .then((res) => {
        setReviews(res);
        setIsLoading(false);
      })
      .catch(({ response: { status } }) => {
        setReqError(status);
        setIsLoading(false);
      });
  }, [searchQueries, category]);

  const handleSorterChange = (event) => {
    setSorter(event.target.value);
  };
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = { sort_by: sorter, order };
    setSearchQueries(searchQuery);
  };

  if (reqError !== null) {
    return <NotFound type="category" />;
  }

  return (
    <>
      {category ? (
        <h2>{category.replaceAll("-", " ")}</h2>
      ) : (
        <>
          <h2>All Reviews</h2>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="sort-value">Sort by</label>
        <select value={sorter} id="sort-value" onChange={handleSorterChange}>
          <option value="created_at">Date</option>
          <option value="title">Title</option>

          <option value="designer">Designer</option>
          <option value="votes">Likes</option>
        </select>
        <label htmlFor="order"></label>
        <select value={order} id="order" onChange={handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button type="submit">Apply</button>
      </form>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {reviews.map((review) => {
            return <ListedReview key={review.review_id} review={review} />;
          })}
        </ul>
      )}
    </>
  );
};

export default Reviews;
