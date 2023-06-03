import { useRef, useEffect } from 'react';
import './CustomSlider.css';
// export default CustomSlider;

const CustomSlider = () => {
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
        Continue Your Good Work
      </h2>
      <div className="image-container" ref={containerRef}>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        <div className="image h-full p-2">
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 2"
            className="w-full h-full"
          />
          <div className="progress-bar rounded-2xl mt-2"></div>
        </div>
        {/* Add more images as needed */}
      </div>
    </>
  );
};

export default CustomSlider;
