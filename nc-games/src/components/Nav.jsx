import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api";
import { User } from "../contexts/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <nav>
      <li className="dropdown" id="categories">
        <button className="nav-button">
          Categories <FontAwesomeIcon icon={faCaretDown} />
        </button>

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
      <Link to="/reviews" className="nav-button">
        All Reviews
      </Link>
      <Link to="/" className="nav-button" id="log-out">
        {user === null ? (
          "Log in"
        ) : (
          <>
            Logout
            <img
              src={user.avatar_url}
              alt={user.username + "avatar"}
              id="nav-avatar"
            />
          </>
        )}
      </Link>
    </nav>
  );
};

export default Nav;
