import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { fetchVideosByUserId } from '../../../../services/homeServices';
import { useEffect, useState } from 'react';
import ProgressBarSlider from '../../Slider/ProgressBarSlider/ProgressBarSlider';
import './ProgressSlider.css';
// Rest of your component code
function ProgressSlider(props) {
  const [totalSentences, setTotalSentences] = useState(1);
  const [isCorrect, setIsCorrect] = useState([]);

  const updateLineCorrect = (index) => {
    setIsCorrect((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = true;
      return newArray;
    });
  };

  return (
    <div>
      <Swiper slidesPerView={2} className="mySwiper w-7/12">
        {props.progressItems.map((e, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide py-16 px-16">
              <div className="card bg-white shadow-lg rounded-xl p-2 text-center">
                <img src={e.thumbnailLink} alt="Image 1" className="w-full" />
                <p className="text-sm leading-tight mt-3">{e.title}</p>
                <ProgressBarSlider
                  bg="#000"
                  completed={
                    (e.progress.split(' ').length / JSON.parse(e.subtitle)?.events?.length) * 100
                  }
                />
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
