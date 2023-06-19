import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import './ProgressCard.css';

function ProgressCard({ videoid, title, thumbnail, channel, views, level, progress, color }) {
  return (
    <Link to={`/video/${videoid}`}>
      <div className="flex my-10 w-3/4 h-full m-auto shadow-xl items-center transition duration-300 ease-out hover:-translate-y-3  hover:ease-in hover:shadow-black hover:cursor-pointer relative">
        <div className="flex-initial stroke-line" style={{ '--line-color': color }}></div>
        <div className="flex-initial w-80 mr-2 p-5">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="flex flex-col flex-1 m-8">
          <h2 className="text-lg">{title}</h2>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-gray-600 text-sm">{channel} | </span>
              <span className="text-gray-600 text-sm">{`${views} writes`}</span>
            </div>
            <div className="px-7 rounded-xl bg-primary text-white text-lg">{level}</div>
          </div>
          <ProgressBar bgcolor={color} completed={progress} />
        </div>
      </div>
    </Link>
  );
}

export default ProgressCard;
