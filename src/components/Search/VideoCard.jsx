import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const VideoCard = ({
  srcId,
  videoId,
  thumbnail,
  length,
  title,
  channelAvatar,
  channelName,
  views,
}) => {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator(`/video/${videoId}`);
  };

  return (
    <Link to={`/video/${videoId}`}>
    <div
      // onClick={handleClick}
      className="bg-white rounded-lg shadow-lg transition duration-300 ease-out hover:-translate-y-3  hover:ease-in hover:shadow-black cursor-pointer"
    >
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-auto rounded-t-lg" />
        {/* <span className="absolute top-2 right-2 px-2 py-1 bg-black text-white text-xs font-bold rounded">{length}</span> */}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        <div className="flex items-center space-x-2 mb-2 ">
          {/* <img src={channelAvatar} alt="Channel Avatar" className="w-8 h-8 rounded-full" /> */}
          <span className="text-gray-600 text-sm">{channelName}</span>
        </div>
        {/* <p className="text-gray-600">{views} views</p> */}
      </div>
    </div>
    </Link>
  );
};

export default VideoCard;
