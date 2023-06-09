import ProgressCard from '../../components/Progress/ProgressCard';
import NavBar from '../../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { fetchVideosByUserId } from '../../services/homeServices';

function ProgressPage() {
  const [progressItems, setProgressItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVideosByUserId(2);
        setProgressItems(response.data);
        console.log(response.data);
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
        {progressItems.map((e, index) => (
          <ProgressCard
            key={index}
            title={e.title}
            channel={e.channelName}
            level={e.level}
            progress={e.progress}
            thumbnail={e.thumbnailLink}
            views={e.learntCount}
            color={e.color}
          />
        ))}
      </div>
    </>
  );
}

export default ProgressPage;
