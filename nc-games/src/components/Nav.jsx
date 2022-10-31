import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../contexts/User";

const Nav = () => {
  const user = useContext(User);

  return (
    <nav>
      <Link to="/reviews">
        <button className="nav-button">Reviews</button>
      </Link>
      <Link to="/">
        <button className="nav-button" id="log-out">
          Logout
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
