import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleVideo from './pages/SingleVideoPage/SingleVideo';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProgressPage from './pages/Progress/ProgressPage';
import Signin from './signin-signup/Signin';
import Signup from './signin-signup/Signup';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AboutPage from './pages/AboutPage/AboutPage';
import Customers from './pages/Admin/Customer/Customers';
import VerifyPage from './pages/VerifyPage/VerifyPage';
import YouTubeVideo_SubEdit from './components/SingleVideo/YoutubeVideo_SubEdit';
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
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/video/:videoId" element={<SingleVideo />} />
          <Route path="/subedit" element={<YouTubeVideo_SubEdit />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/verify/:verifyToken" element={<VerifyPage />} />


          <Route path="*" element={<NotFoundPage />} />c
          <Route path="/admin/customers" element={<Customers />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
