import { FiLogIn, FiUserPlus, FiUser, FiSearch } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    // console.log(inputValue);
  };
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${inputValue}`);
  };
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    navigate('/signin');
  }

  return (
    <nav className="bg-navBarColor py-4 px-8 flex flex-wrap items-center">
      <div className="text-2xl font-bold text-white">
        <Link to="/">
          <img width={70} src={require('../../assets/logo.png')} alt="Logo" />
        </Link>
      </div>
      <ul className="ml-10 py-4 space-x-14 flex flex-wrap md:flex-nowrap items-center">
        <li>
          <Link to="/" className="text-secondaryColor hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" className="text-secondaryColor hover:text-gray-600">
            Videos
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-secondaryColor hover:text-gray-600">
            About Us
          </Link>
        </li>
        {location.pathname === '/search' ? (
          <></>
        ) : (
          <li>
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <form onSubmit={handleSearch}>
                <input
                  value={inputValue}
                  onChange={handleChange}
                  type="text"
                  className="bg-searchBarColor px-5 py-3 w-full md:w-96 shadow-lg placeholder-searchBarPlaceHolder text-searchBarPlaceHolder"
                  placeholder="Search your favorite video"
                />
              </form>
              {/* <FiSearch className="absolute top-1/4 left-3/4 ml-10" /> */}
            </div>
          </li>
        )}
      </ul>

      <div className="ml-auto flex space-x-6">
        {token ? (
          <div className="flex flex-row justify-center items-center space-x-4">
            <Link to="/profile">
              <div className="flex flex-1 items-center text-secondaryColor overflow-hidden whitespace-nowrap">
                <FiUser className="mr-2" />
                {userName}
              </div>
            </Link>
            <button className="bg-secondaryColor text-primaryColor font-semibold py-2 px-4" onClick={() => logout()}>
              Log out
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="flex items-center text-secondaryColor hover:text-gray-600"
            >
              <FiLogIn className="mr-2" />
              Log in
            </Link>
            <Link
              to="/signup"
              className="flex items-center text-secondaryColor hover:text-gray-600"
            >
              <FiUserPlus className="mr-2" />
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
