import './YourLevel.css';
import ProgressSlider from './ProgressSlider/ProgressSlider';
function YourLevel() {
  return (
    <div className="level-container relative -mt-12 overflow-x-hidden flex flex-row h-full">
      <div className="h-full w-7/12 bg-primary flex flex-col py-32 relative">
        <div className="flex max-w-full w-full justify-start items-center ml-20">
          <h2 className="text-white text-6xl">Personalize Your Experience</h2>
          {/* <div className="bg-blue-300 text-base lg:text-4xl sm:text-sm ml-14 rounded-xl p-3">
            B1 Level
          </div> */}
        </div>
        <div className="w-1/2 text-white mt-14 ml-20 text-3xl text-justify">
          We offer a personalized experience to help you improve your English skills. With our
          advanced technology, we can assess your language proficiency and preferences, and provide
          you with customized learning materials tailored to your specific needs. Our platform
          allows you to track your progress and receive feedback from our robust English language
          tools.
        </div>
      </div>
      <div className="level-recommend absolute">
        <ProgressSlider />
      </div>
    </div>
  );
}
export default YourLevel;
