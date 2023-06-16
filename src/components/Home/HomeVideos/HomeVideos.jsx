import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../../../services/homeServices';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Navbar/Footer';
const GridItem = ({ imageSrc, authorName, authorAvatar, title }) => {
  return (
    <div className="flex flex-col">
      <img src={imageSrc} alt="Image" className="w-full h-auto rounded-xl" />
      <div className="flex items-center">
        <div className="mt-2">
          <img src={authorAvatar} alt="Avatar" className="w-20 h-20 rounded-full" />
        </div>
        <div className="mt-2 ml-4 sm:ml-10 flex flex-col items-start">
          <h3 className="text-gray-800 text-lg font-semibold">{title}</h3>
          <h3 className="text-gray-700 text-lg">{authorName}</h3>
        </div>
      </div>
    </div>
  );
};

const HomeVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchVideos();
        setVideos(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching videos:', error);
      }
    };

    fetchData();
  }, []);

  const navigator = useNavigate();

  const handleClick = (videoid) => {
    navigator(`/video/${videoid}`);
  };

  return (
    <>
      <h2
        style={{
          marginLeft: '60px',
          marginTop: '19.92px',
          marginBottom: '19.92px',
          color: '#2C2C2C',
          fontWeight: 'bold',
          fontSize: '26px',
        }}
      >
        Browse
      </h2>
      <div class="image-grid relative">
        {videos.slice(0, 12).map((video, index) => (
          <div
            key={index}
            class="grid-item hover:cursor-pointer"
            onClick={() => handleClick(video?.videoid)}
          >
            <div class="grid-item-content">
              <div class="grid-image">
                <img src={`${video.thumbnailLink}`} alt="Image 1" />
              </div>
              <div class="grid-title">
                <div class="circular-image">
                  <img
                    src="https://static.skillshare.com/uploads/users/tmp/67305fda"
                    alt="Image 1"
                  />
                </div>
                <div className="title">
                  <div className="title-video">{`${video.title}`}</div>
                  {video?.premium ? (
                    <div className="PREMIUM-tag" style={{ marginLeft: '20px', marginTop: '12px' }}>
                      <div className="box">
                        <h4 className="text">PREMIUM</h4>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="creator">{`${video.channelName}`}</div>
                  <div className="views">{`${video.learntCount} writes · 1 year ago`}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="button-container">
        <button class="button hover:bg-red-300">SEE MORE</button>
      </div> */}
      <Footer />
    </>
  );
};

export default HomeVideos;
