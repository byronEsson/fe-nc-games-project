import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../contexts/User";

const Nav = () => {
  const user = useContext(User);

  const handleClick = (event) => {
    const buttons = [...document.getElementsByClassName("nav-button")];
    buttons.forEach((button) => {
      button.classList.remove("active");
      console.log(button);
    });
    console.log(buttons);
    event.target.classList.add("active");
  };
  return (
    <nav>
      <Link to="/reviews">
        <button className="nav-button" onClick={handleClick}>
          Reviews
        </button>
      </Link>
      <Link to="/">
        <button className="nav-button" id="log-out" onClick={handleClick}>
          Logout
        </button>
      </Link>
    </nav>
  );
};

export default Nav;
