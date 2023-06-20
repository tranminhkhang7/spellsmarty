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
    const cacheBuster = Date.now();
    navigate(`/search?q=${inputValue}&upd=${cacheBuster}`);
  };
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  return (
    <nav className="bg-navBarColor px-8 flex flex-wrap items-center">
      <div className="text-xl font-bold text-white">
        <Link to="/">
          <img width={90} src={require('../../assets/logo-2.png')} alt="Logo" />
        </Link>
      </div>
      <ul className="ml-10 py-4 space-x-14 flex flex-wrap md:flex-nowrap items-center text-sm">
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
        {token ? (
          <li>
            <Link to="/progress" className="text-secondaryColor hover:text-gray-600">
              Progress
            </Link>
          </li>
        ) : (
          <></>
        )}

        <li>
          <Link to="/about" className="text-secondaryColor hover:text-gray-600">
            About Us
          </Link>
        </li>
        <li>
          <div
            className="relative text-gray-400 focus-within:text-gray-600 "
            style={{ visibility: location.pathname === '/search' ? 'hidden' : 'visible' }}
          >
            <form onSubmit={handleSearch}>
              <input
                value={inputValue}
                onChange={handleChange}
                type="text"
                className="border-solid border-black border focus:border-solid focus:border-white transition bg-searchBarColor px-5 py-3 w-full md:w-96 shadow-lg placeholder-searchBarPlaceHolder text-searchBarPlaceHolder"
                placeholder="Search your favorite video"
                style={{ '--placeholder-color': 'red' }}
              />
            </form>
            {/* <FiSearch className="absolute top-1/4 left-3/4 ml-10" /> */}
          </div>
        </li>
      </ul>

      <div className="ml-auto flex space-x-6">
        {token ? (
          <div className="flex flex-row justify-center items-center space-x-4">
            <Link to="/profile">
              <div className="flex flex-1 items-center text-secondaryColor overflow-hidden whitespace-nowrap text-sm hover:text-gray-600">
                <FiUser className="mr-2" />
                {userName}
              </div>
            </Link>

            <button
              className="border-solid border-white bg-white text-black font-semibold py-2 px-4 text-sm hover:bg-black hover:text-white transition"
              onClick={() => logout()}
            >
              Log out
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="flex items-center text-secondaryColor hover:text-gray-600 text-sm"
            >
              <FiLogIn className="mr-2" />
              Log in
            </Link>
            <Link
              to="/signup"
              className="flex items-center text-secondaryColor hover:text-gray-600 text-sm"
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
