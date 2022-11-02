import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api";

const Login = ({ setUser }) => {
  const [formText, setFormText] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [logInError, setLogInError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormText(event.target.value);
  };

  useEffect(() => {
    setUser(null);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    setLogInError(null);
    event.target.children[2].disabled = true;
    fetchUser(formText)
      .then((res) => {
        setUser(res);
        setIsLoggingIn(false);
        navigate("/reviews");
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          setIsLoggingIn(false);
          setLogInError(msg + "!");
          setFormText("");
          event.target.children[2].disabled = false;
        }
      );
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login"></label>
      <input
        placeholder="Username"
        value={formText}
        onChange={handleChange}
      ></input>
      <button type="submit">{isLoggingIn ? "Logging In" : "Log In"}</button>
      <span>{logInError}</span>
    </form>
  );
};

export default Login;
