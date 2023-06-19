import './YourLevel.css';
import ProgressSlider from './ProgressSlider/ProgressSlider';
import { fetchVideosByUserId } from '../../../services/homeServices';
import { useEffect, useState } from 'react';
function YourLevel() {
  const [progressItems, setProgressItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVideosByUserId(localStorage.getItem('token'));

        console.log(response);
        setProgressItems(response === undefined ? [] : response.data);
        console.log(progressItems.length);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="level-container relative -mt-12 overflow-x-hidden flex flex-row h-full">
      <div
        className={`h-fit ${
          progressItems.length === 0 ? 'w-full items-center' : 'w-7/12'
        } bg-primaryColor flex flex-col py-20 relative`}
      >
        <div
          className={`flex max-w-full w-full ${
            progressItems.length === 0
              ? 'justify-center items-center text-2xl lg:text-3xl 2xl:text-4xl font-bold'
              : 'justify-start items-center ml-20 text-xl lg:text-2xl 2xl:text-3xl font-bold'
          }`}
        >
          <h2 className="text-white">Continue your good work</h2>
          {/* <div className="bg-blue-300 text-base lg:text-4xl sm:text-sm ml-14 rounded-xl p-3">
            B1 Level
          </div> */}
        </div>
        <div
          className={`w-2/3 text-secondaryColor mt-14  text-justify ${
            progressItems.length === 0
              ? 'text-xl lg:text-2xl 2xl:text-2xl font-semibold'
              : 'text-lg lg:text-lg 2xl:text-xl ml-20 font-semibold'
          }`}
        >
          We applaud your commitment to continuing your video progress and encourage you to keep up
          the good work. Remember, learning is a journey, and every step forward counts. Embrace the
          power of persistence and dedication as you explore new topics, acquire valuable skills,
          and broaden your knowledge. Let us support you on this path of growth and inspire you to
          achieve your learning goals. Together, we can embark on an exciting adventure of continual
          progress and create a future filled with endless possibilities. Keep going, and enjoy the
          transformative power of ongoing learning!
        </div>
      </div>
      <div className="level-recommend absolute">
        <ProgressSlider progressItems={progressItems} />
      </div>
    </div>
  );
}
export default YourLevel;
