import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Paginator = ({ setSearchQueries, count, setOptions, options }) => {
  const [pagesSelector, setPagesSelector] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    setPagesSelector([]);
    const pages = Math.ceil(count / 10);
    setPagesSelector(() => {
      const newSelector = [];
      for (let i = 1; i <= pages; i++) {
        newSelector.push(i);
      }
      return newSelector;
    });
  }, [count, category]);

  const handleClick = (event) => {
    event.preventDefault();
    setOptions((current) => {
      return { ...current, p: event.target.name };
    });
    setSearchQueries({ ...options, p: event.target.name });
  };

  return (
    <ul className="paginator">
      <li id="pages-showing" className="label">
        Showing page {options.p ? options.p : 1} of {pagesSelector.length}
      </li>{" "}
      {pagesSelector.map((selector) => {
        return (
          <Link
            name={selector}
            key={selector}
            onClick={handleClick}
            className={
              parseFloat(options.p) === selector
                ? "active"
                : options.p === undefined && selector === 1
                ? "active"
                : ""
            }
          >
            {" "}
            {selector}
          </Link>
        );
      })}
    </ul>
  );
};

export default Paginator;
