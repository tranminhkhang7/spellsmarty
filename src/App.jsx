import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleVideo from './pages/SingleVideoPage/SingleVideo';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* <Route
            exact
            path="/"
            element={
              <NotAdminRoute>
                <Home />
              </NotAdminRoute>
            }
          /> */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/video" element={<SingleVideo />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
