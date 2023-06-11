import { FiLogIn, FiUserPlus, FiUser, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    // Check if token is present in localStorage
    setToken(localStorage.getItem('token'));
    setUserName(localStorage.getItem('username'));
  }, []);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  return (
    <nav className="bg-gray-950 py-4 px-8 flex flex-wrap items-center">
      <div className="text-2xl font-bold text-white">
        <Link to="/">
          <img width={70} src={require('../../assets/logo.png')} alt="Logo" />
        </Link>
      </div>
      <ul className="ml-10 py-4 space-x-14 flex flex-wrap md:flex-nowrap items-center">
        <li>
          <Link to="/" className="text-white hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" className="text-white hover:text-gray-600">
            Videos
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:text-gray-600">
            About
          </Link>
        </li>
        <li>
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <input
              value={inputValue}
              onChange={handleChange}
              type="text"
              className="px-20 py-3 rounded-full w-full shadow-lg"
              placeholder="Search your favorite video"
            />
            <FiSearch className="absolute top-1/4 left-3/4 ml-10" />
          </div>
        </li>
      </ul>

      <div className="ml-auto flex space-x-6">
        {token ? (
          <Link to="/profile">
            <div className="flex items-center text-white overflow-hidden whitespace-nowrap">
              <FiUser className="mr-2" />
              {userName}
            </div>
          </Link>
        ) : (
          <>
            <Link to="/signin" className="flex items-center text-white hover:text-gray-600">
              <FiLogIn className="mr-2" />
              Login
            </Link>
            <Link to="/signup" className="flex items-center text-white hover:text-gray-600">
              <FiUserPlus className="mr-2" />
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
