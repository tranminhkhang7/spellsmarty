import './YourLevel.css';

function YourLevel() {
  return (
    <div className="relative -mt-12">
      <div className="h-full w-6/12 bg-blue-900 flex flex-col py-28">
        <div className="flex max-w-full w-full justify-start items-center ml-20">
          <h2 className="text-white text-7xl">Your Level</h2>
          <div className="bg-blue-300 text-base lg:text-4xl sm:text-sm ml-14 rounded-xl p-3">
            B1 Level
          </div>
        </div>
        <div className="w-1/2 text-white mt-14 ml-20">
          We offer a personalized experience to help you improve your English skills. With our
          advanced technology, we can assess your language proficiency and preferences, and provide
          you with customized learning materials tailored to your specific needs. Our platform
          allows you to track your progress and receive feedback from our robust English language
          tools.
        </div>
      </div>
      <div className="level-recommend rounded-xl h-3/4 absolute top-4 mt-12 ml-20 z-10 shadow-xl">
        <div className="bg-white rounded-xl w-full h-full">
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src="https://photoresources.wtatennis.com/photo-resources/2019/10/08/16313740-f4f5-4d76-bb46-10048e3a74fc/UUdKdWvR.jpg?width=1200&height=630"
              alt=""
              className="object-fill h-full rounded-xl max-h-full max-w-full transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white rounded-b-xl p-2 text-center">
              How being a nomad changes my entire life forever, like, ever
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl h-2/3 w-1/3 absolute left-1/2 top-9 mt-12 ml-20 shadow-xl">
        <div className="bg-white rounded-xl w-full h-full">
          <div className="relative w-full h-full">
            <img
              src="https://static.skillshare.com/uploads/video/thumbnails/41dad68d5836f509b9d1dd7201d0db7c/original "
              alt=""
              className="object-fill h-full w-auto rounded-xl"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white rounded-b-xl p-2 text-center">
              How being a nomad changes my entire life forever, like, ever
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourLevel;
