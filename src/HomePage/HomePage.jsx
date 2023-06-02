import { useState } from 'react';
import './HomePage.css';
import { FiSearch } from 'react-icons/fi';
import YourLevel from './Components/YourLevel/YourLevel';
import CustomSlider from './Components/Slider/CustomSlider';
import HomeVideos from './Components/HomeVideos/HomeVideos';
import TypingEffect from '../TypingEffect/TypingEffect';
import NavBar from '../Navbar/Navbar';

const HomePage = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  return (
    <>
      <NavBar />
      <div>
        <div className="relative">
          <img
            src="https://www.nationalcollege.edu.au/wp-content/uploads/2019/08/iStock-877985916.jpg"
            alt="background"
            className="w-full"
            loading="lazy"
          />
          <div className="flex flex-col absolute top-1/3 left-3/4 home-text text-base md:text-5xl sm:text-sm md:w-1/3">
            <div className="text-white mb-10 text-left">
              <div className="inline-block px-5 py-3 splash-text">We're here to help you</div>
            </div>
            <h1 className="text-center relative mb-10">
              <span className="text-base md:text-7xl sm:text-sm">
                <span className="before:absolute before:content before:w-1.5 before:h-full before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:bg-red-500"></span>
                Write Your Way To English Fluency
              </span>
            </h1>
            <TypingEffect
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            />
          </div>
          <div className="inline-block text-gray-400 focus-within:text-gray-600 absolute bottom-1/3 left-14 mb-4 ml-4 w-1/4 lg:w-1/4 md:w-full sm:w-full">
            <input
              value={inputValue}
              onChange={handleChange}
              type="text"
              className="px-6 py-3 rounded-full w-full shadow-lg"
              placeholder="Search your favorite video"
            />
            <FiSearch className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-5" />
          </div>
          <YourLevel />
        </div>
        {/* <YourLevel /> */}
        <h2 className="text-4xl font-semibold">Continue your good work</h2>
        <CustomSlider />
        <h2 className="text-4xl font-semibold">Browse</h2>
        <HomeVideos />
      </div>
    </>
  );
};

export default HomePage;
