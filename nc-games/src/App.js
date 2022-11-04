import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import { User } from "./contexts/User";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SingleReview from "./components/SingleReview";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <User.Provider value={user}>
        <div className="App">
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
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
