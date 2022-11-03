import { useEffect, useState } from "react";

const Paginator = ({ setSearchQueries, count, setOptions, options }) => {
  const [pagesSelector, setPagesSelector] = useState([]);

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
  }, [count]);

  const handleClick = (event) => {
    setOptions((current) => {
      return { ...current, p: event.target.value };
    });
    setSearchQueries({ ...options, p: event.target.value });
  };

  return (
    <ul>
      {pagesSelector.map((selector) => {
        return (
          <li key={selector} onClick={handleClick} value={selector}>
            {selector}
          </li>
        );
      })}
    </ul>
  );
};

export default Paginator;
