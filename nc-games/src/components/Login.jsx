import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../api";

const Login = ({ setUser }) => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    fetchUsers().then((response) => {
      setUsers(response);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  else
    return (
      <section id="login-section">
        <ul className="users">
          {users.map((user) => {
            return (
              <Link to="/reviews">
                <li
                  key={user.username}
                  onClick={() => {
                    setUser(user);
                  }}
               className="users-list-item" >
                  <img
                    className="avatar"
                    src={user.avatar_url}
                    alt={user.username + "'s avatar"}
                  />
                  <p>{user.username}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </section>
    );
};

export default Login;
