import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleVideo from './pages/SingleVideoPage/SingleVideo';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProgressPage from './pages/Progress/ProgressPage';
import Signin from './signin-signup/Signin';
import Signup from './signin-signup/Signup';
import ProfilePage from './pages/ProfilePage/ProfilePage';
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
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
