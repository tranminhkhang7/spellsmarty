import ProgressCard from '../../components/Progress/ProgressCard';
import NavBar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { fetchVideosByUserId } from '../../services/homeServices';

function ProgressPage() {
  const [progressItems, setProgressItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVideosByUserId(localStorage.getItem('token'));
        setProgressItems(response === undefined ? [] : response.data);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <div className="p-10">
        {progressItems ? (
          progressItems.map((e, index) => (
            <ProgressCard
              key={index}
              title={e.title}
              channel={e.channelName}
              level={e.level}
              progress={(
                (e.progress.split(' ').length / JSON.parse(e.subtitle)?.events?.length) *
                100
              ).toFixed(1)}
              thumbnail={e.thumbnailLink}
              views={e.learntCount}
              color={e.color}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img src={require('../../assets/tumbleweed.gif')} alt="Tumbleweed" />
            <h2 className="text-xl font-semibold">Get yourself some exercises</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default ProgressPage;
