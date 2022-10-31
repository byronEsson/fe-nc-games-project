import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api";
import { User } from "../contexts/User";

const Nav = () => {
  const user = useContext(User);
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then((res) => {
      setCategories(res);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (event) => {
    const buttons = [...document.getElementsByClassName("nav-button")];
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    event.target.classList.add("active");
  };

  return (
    <nav>
      <Link to="/reviews" className="nav-button" onClick={handleClick}>
        All Reviews
      </Link>
      <li className="dropdown" id="categories" onClick={{ handleClick }}>
        <button className="nav-button">Categories</button>
        <ul className="content">
          {isLoading ? (
            <></>
          ) : (
            categories.map((category) => {
              return (
                <Link
                  to={`/reviews/${category.slug}`}
                  className="dropdown-content"
                  key={category.slug}
                >
                  {category.slug}
                </Link>
              );
            })
          )}
        </ul>
      </li>
      <Link to="/" className="nav-button" id="log-out" onClick={handleClick}>
        Logout
      </Link>
    </nav>
  );
};

export default Nav;
