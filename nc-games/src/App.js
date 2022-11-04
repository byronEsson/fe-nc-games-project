import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import { User } from "./contexts/User";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SingleReview from "./components/SingleReview";
import { useState, useEffect } from "react";
import PostReview from "./components/PostReview";
import { fetchCategories } from "./api";

function App() {
  const [user, setUser] = useState(null);
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
    <BrowserRouter>
      <User.Provider value={user}>
        <div className="App">
          <Header />
          <Nav categories={categories} isLoading={isLoading} />
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/review/:review_id" element={<SingleReview />} />
            <Route path="/reviews/:category" element={<Reviews />} />
            <Route
              path="/post/review"
              element={
                <PostReview categories={categories} isLoading={isLoading} />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </User.Provider>
    </BrowserRouter>
  );
}

export default App;
