import ProgressBar from './ProgressBar';
import './ProgressCard.css';

function ProgressCard({ title, thumbnail, channel, views, level, progress, color }) {
  return (
    <>
      <div className="flex my-16 w-3/4 h-full m-auto shadow-2xl items-center transition duration-300 ease-out hover:-translate-y-3  hover:ease-in hover:shadow-black relative">
        <div className="flex-initial stroke-line" style={{ '--line-color': color }}></div>{' '}
        {/* Added stroke line */}{' '}
        <div className="flex-initial w-96 mr-2 p-5">
          <img className="rounded-xl" src={thumbnail} alt={title} />
        </div>
        <div className="flex flex-col flex-1 m-8">
          <h2>{title}</h2>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-gray-600">{channel} |</span>
              <span className="text-gray-600">{views}</span>
            </div>
            <div className="px-7 rounded-xl" style={{ backgroundColor: color }}>
              {level}
            </div>
          </div>
          <ProgressBar bgcolor={color} completed={progress} />
        </div>
      </div>
    </>
  );
}

export default ProgressCard;
