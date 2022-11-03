import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    setOptions((current) => {
      return { ...current, p: event.target.value };
    });
    setSearchQueries({ ...options, p: event.target.value });
  };

  return (
    <ul className="paginator">
      <li id="pages-showing" className="label">
        Showing page {options.p ? options.p : 1} of {pagesSelector.length}
      </li>{" "}
      {pagesSelector.map((selector) => {
        return (
          <li
            key={selector}
            onClick={handleClick}
            value={selector}
            className={
              options.p === selector
                ? "active"
                : options.p === undefined && selector === 1
                ? "active"
                : ""
            }
          >
            {selector}
          </li>
        );
      })}
    </ul>
  );
};

export default Paginator;
