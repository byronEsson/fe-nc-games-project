import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import { User } from "./contexts/User";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SingleReview from "./components/SingleReview";

const defaultUser = {
  username: "tickle122",
  name: "Tom Tickle",
  avatar_url:
    "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
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
            <Route path="/review/:review_id" element={<SingleReview />} />
            <Route path="/reviews/:category" element={<Reviews />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </User.Provider>
    </BrowserRouter>
  );
}

export default App;
