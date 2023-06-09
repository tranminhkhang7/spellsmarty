import { useState } from 'react';
import './HomePage.css';
import { FiSearch } from 'react-icons/fi';
import YourLevel from '../../components/Home/YourLevel/YourLevel';
import CustomSlider from '../../components/Home/Slider/CustomSlider';
import HomeVideos from '../../components/Home/HomeVideos/HomeVideos';
import TypingEffect from '../../utils/TypingEffect/TypingEffect';
import NavBar from '../../components/Navbar/Navbar';
import backgroundImage from '../../assets/background.png';

const HomePage = () => {
  // const [inputValue, setInputValue] = useState('');

  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  //   console.log(inputValue);
  // };
  return (
    <>
      <NavBar />
      <div>
        <div className="relative">
          <img src={backgroundImage} alt="background" className="w-full" loading="lazy" />
          <div className="flex flex-col absolute top-1/4 left-3/4 home-text text-base md:text-lg sm:text-sm md:w-1/3">
            <div className="text-white text-left">
              <div className="inline-block px-5 py-3 splash-text uppercase font-semibold">
                We are here to help you
              </div>
            </div>
            <h1 className="text-center relative py-3 my-10">
              <span className="text-base md:text-3xl sm:text-sm font-bold">
                <span className="before:absolute before:content before:w-1 before:h-full before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:bg-browne ml-4"></span>
                Write Your Way To English Fluency
              </span>
            </h1>
            <TypingEffect
              text={`Master English with SpellSmarty!\n\nWelcome to our immersive English learning platform. Dive into a world of captivating content, interactive exercises, and a supportive community.\n\nMaster English. Empower Yourself.`}
            />
          </div>
          {/* <div className="inline-block text-gray-400 focus-within:text-gray-600 absolute bottom-1/3 left-14 mb-28 ml-4 w-1/4 lg:w-1/4 md:w-full sm:w-full">
            <input
              value={inputValue}
              onChange={handleChange}
              type="text"
              className="px-6 py-3 rounded-full w-full shadow-lg"
              placeholder="Search your favorite video"
            />
            <FiSearch className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-5" />
          </div> */}
          <YourLevel />
        </div>
        {/* <YourLevel /> */}
        {/* <h2 className="text-4xl font-semibold">Continue your good work</h2> */}
        {/* <CustomSlider /> */}
        {/* <h2 className="text-4xl font-semibold">Browse</h2> */}
        <HomeVideos />
      </div>
    </>
  );
};

export default HomePage;
