import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../contexts/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ categories, isLoading }) => {
  const user = useContext(User);
  return (
    <nav>
      <li className="dropdown" id="categories">
        <button className="nav-button">
          Reviews <FontAwesomeIcon icon={faCaretDown} />
        </button>

        <ul className="content">
          {isLoading ? (
            <></>
          ) : (
            <>
              <Link to="/reviews" className="dropdown-content">
                all
              </Link>
              {categories.map((category) => {
                return (
                  <Link
                    to={`/reviews/${category.slug}`}
                    className="dropdown-content"
                    key={category.slug}
                  >
                    {category.slug}
                  </Link>
                );
              })}
            </>
          )}
        </ul>
      </li>
      {/* <Link to="/reviews" className="nav-button">
        All Reviews
      </Link> */}
      <Link to="/post/review" className="nav-button">
        Post
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
