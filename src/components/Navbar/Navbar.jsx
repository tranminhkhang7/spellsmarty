import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="bg-gray-950 py-4 px-8 flex flex-wrap items-center">
      <div className="text-2xl font-bold text-white">
        <img width={70} src={require('../../assets/logo.png')} alt="Logo" />
      </div>
      <ul className="ml-10 space-x-14 flex flex-wrap md:flex-nowrap">
        <li>
          <Link to="/home" className="text-white hover:text-gray-600">
            Home
          </Link>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-600">
            About
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-600">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-600">
            Pricing
          </a>
        </li>
      </ul>
      <div className="ml-auto flex space-x-6">
        <button className="flex items-center text-white hover:text-gray-600">
          <FiLogIn className="mr-2" />
          Login
        </button>
        <button className="flex items-center text-white hover:text-gray-600">
          <FiUserPlus className="mr-2" />
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
