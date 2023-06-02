import Progress from '../../assets/progress';
import ProgressCard from '../../components/Progress/ProgressCard';
import NavBar from '../../components/Navbar/Navbar';
import { useState } from 'react';
function ProgressPage() {
  const [data, setData] = useState(Progress);
  return (
    <>
      <NavBar />
      <div className="p-10">
        {data.map((e) => (
          <ProgressCard
            title={e.title}
            channel={e.channel}
            level={e.level}
            progress={e.progress}
            thumbnail={e.thumbnail}
            views={e.views}
            color={e.color}
          />
        ))}
      </div>
    </>
  );
}

export default ProgressPage;
