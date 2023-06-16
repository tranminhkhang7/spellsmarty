import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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
import UserRouter from './routers/UserRouter';
import NoRoleRouter from './routers/NoRoleRouter';
const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <UserRouter>
                <Outlet />
              </UserRouter>
            }>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/video/:videoId" element={<SingleVideo />} />
            <Route exact path="/subedit" element={<YouTubeVideo_SubEdit />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/progress" element={<ProgressPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/verify/:verifyToken" element={<VerifyPage />} />
          </Route>

          <Route
            path="/"
            element={
              <NoRoleRouter>
                <Outlet />
              </NoRoleRouter>
            }>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />c
          <Route path="/admin/customers" element={<Customers />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
