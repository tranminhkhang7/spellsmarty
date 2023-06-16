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
        className={`h-full ${
          progressItems.length === 0 ? 'w-full items-center' : 'w-7/12'
        } bg-primaryColor flex flex-col py-32 relative`}
      >
        <div
          className={`flex max-w-full w-full ${
            progressItems.length === 0
              ? 'justify-center items-center'
              : 'justify-start items-center'
          }  ml-20`}
        >
          <h2 className="text-white text-6xl">Personalize Your Experience</h2>
          {/* <div className="bg-blue-300 text-base lg:text-4xl sm:text-sm ml-14 rounded-xl p-3">
            B1 Level
          </div> */}
        </div>
        <div className={`w-1/2 text-secondaryColor mt-14 ml-20 text-3xl text-justify`}>
          We offer a personalized experience to help you improve your English skills. With our
          advanced technology, we can assess your language proficiency and preferences, and provide
          you with customized learning materials tailored to your specific needs. Our platform
          allows you to track your progress and receive feedback from our robust English language
          tools.
        </div>
      </div>
      <div className="level-recommend absolute">
        <ProgressSlider progressItems={progressItems} />
      </div>
    </div>
  );
}
export default YourLevel;
