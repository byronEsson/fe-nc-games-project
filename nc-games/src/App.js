import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import { User } from "./contexts/User";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

const defaultUser = {
  username: "mallionaire",
  name: "haz",
  avatar_url:
    "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
};

function App() {
  return (
    <BrowserRouter>
      <User.Provider value={defaultUser}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </User.Provider>
    </BrowserRouter>
  );
}

export default App;
