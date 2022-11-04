import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchReviews } from "../api";
import ListedReview from "./ListedReview";
import Paginator from "./Paginator";
import NotFound from "./NotFound";

const Reviews = () => {
  const [reviews, setReviews] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sorter, setSorter] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [options, setOptions] = useState();
  const [searchQueries, setSearchQueries] = useSearchParams();
  const [reqError, setReqError] = useState(null);

  const [count, setCount] = useState();
  const { category } = useParams();

  useEffect(() => {
    setOptions({});
    setSorter("created_at");
    setOrder("desc");
  }, [category]);

  useEffect(() => {
    setReqError(null);
    setIsLoading(true);
    let query = "?";
    const queriesObj = Object.fromEntries([...searchQueries]);

    for (const queryParam in queriesObj) {
      query += `${queryParam}=${queriesObj[queryParam]}&`;
    }

    if (category) {
      query += `category=${category}&`;
    }

    fetchReviews(query)
      .then(({ reviews, total_count }) => {
        setReviews(reviews);
        setCount(total_count);
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

    const searchOptions = { sort_by: sorter, order: order };
    setOptions(() => {
      const newOptions = { ...searchOptions };
      return newOptions;
    });
    setSearchQueries(() => {
      const newSearchQueries = { ...searchOptions };
      return newSearchQueries;
    });
  };

  if (reqError !== null) {
    return <NotFound type="category" />;
  }

  return (
    <>
      <div className="header">
        {category ? (
          <h2
            className="reviews-header"
            id={category.length > 10 ? "long" : ""}
          >
            {category.replaceAll("-", " ")}
          </h2>
        ) : (
          <>
            <h2 className="reviews-header">All Reviews</h2>
          </>
        )}
        <form onSubmit={handleSubmit} id="sorter-form">
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
      </div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <Paginator
            setSearchQueries={setSearchQueries}
            count={count}
            setOptions={setOptions}
            options={options}
          />
          <ul>
            {reviews.map((review) => {
              return <ListedReview key={review.review_id} review={review} />;
            })}
          </ul>
          <Paginator
            setSearchQueries={setSearchQueries}
            count={count}
            setOptions={setOptions}
            options={options}
          />
        </>
      )}
    </>
  );
};

export default Reviews;
