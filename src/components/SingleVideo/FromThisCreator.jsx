/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import './FromThisCreator.css';
import { fetchVideoByVideoId } from '../../services/videoServices';
import { fetchVideoByChannelName } from '../../services/videoServices';
import { useNavigate, useParams } from 'react-router-dom';

const FromThisCreator = () => {
  const { videoId } = useParams();
  const [channelName, setChannelName] = useState('');
  const [list, setList] = useState();

  const fetchVideo = () => {
    fetchVideoByVideoId(videoId)
      .then((res) => {
        setChannelName(res?.data?.channelName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideoByChannel = () => {
    fetchVideoByChannelName(channelName)
      .then((res) => {
        setList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchVideoByChannel();
  }, [channelName]);

  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener('mousedown', startDragging);
    container.addEventListener('mousemove', handleDragging);
    container.addEventListener('mouseup', stopDragging);
    container.addEventListener('mouseleave', stopDragging);
    container.addEventListener('touchstart', startDragging);
    container.addEventListener('touchmove', handleDragging);
    container.addEventListener('touchend', stopDragging);
    container.addEventListener('touchcancel', stopDragging);

    return () => {
      container.removeEventListener('mousedown', startDragging);
      container.removeEventListener('mousemove', handleDragging);
      container.removeEventListener('mouseup', stopDragging);
      container.removeEventListener('mouseleave', stopDragging);
      container.removeEventListener('touchstart', startDragging);
      container.removeEventListener('touchmove', handleDragging);
      container.removeEventListener('touchend', stopDragging);
      container.removeEventListener('touchcancel', stopDragging);
    };
  }, []);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const startDragging = (event) => {
    isDragging = true;
    startX = event.pageX || event.touches[0].pageX;
    scrollLeft = containerRef.current.scrollLeft;
  };
  const handleDragging = (event) => {
    if (!isDragging) return;
    event.preventDefault();

    const x = event.pageX || event.touches[0].pageX;
    const walk = x - startX;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    isDragging = false;
  };

  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/video/${videoId}`);
    navigate(0);
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
        From This Creator
      </h2>
      <div className="image-container" ref={containerRef}>
        {list?.map((video, index) => (
          <div className="image-wrapper" key={index} onClick={() => handleClick(video?.videoid)}>
            <img src={video.thumbnailLink} className="image" alt="Image" />
            <div className="overlay">
              <div className="title">
                {video.title}
                <div className="views">
                  {video.learntCount} writes · 1 year ago
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FromThisCreator;
