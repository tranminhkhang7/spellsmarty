import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import { fetchVideosByUserId } from '../../../../services/homeServices';
import { useEffect, useState } from 'react';
import ProgressBarSlider from '../../Slider/ProgressBarSlider/ProgressBarSlider';
import './ProgressSlider.css';
// Rest of your component code
function ProgressSlider() {
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
    <div>
      <Swiper slidesPerView={2} className="mySwiper w-7/12">
        {progressItems.map((e) => (
          <SwiperSlide>
            <div className="swiper-slide py-16 px-16">
              <div className="card bg-white shadow-lg rounded-xl p-2 text-center">
                <img src={e.thumbnailLink} alt="Image 1" className="w-full" />
                <span>{e.title}</span>
                <ProgressBarSlider bg="#000" completed={e.progress} />
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/*  */}
        <SwiperSlide>
          <div></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProgressSlider;
