// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './CustomSlider.css';
// const CustomSlider = () => {
//   const data = [
//     {
//       imageSrc:
//         'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
//       progress: 50,
//     },
//     {
//       imageSrc:
//         'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
//       progress: 75,
//     },
//     {
//       imageSrc:
//         'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
//       progress: 25,
//     },
//     {
//       imageSrc:
//         'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
//       progress: 90,
//     },
//   ];

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 2,
//     centerMode: true,
//   };

//   return (
//     <div className="slider-container overflow-hidden">
//       <Slider {...settings}>
//         {data.map((item, index) => (
//           <div key={index} className="slider-item">
//             <img
//               src={item.imageSrc}
//               alt={`Image ${index + 1}`}
//               className="slider-image"
//               loading="lazy"
//             />
//             <div className="progress-bar">
//               <div className="progress" style={{ width: `${item.progress}%` }}></div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default CustomSlider;

const CustomSlider = () => {
  return (
    <>
      <div className="image-container">
        {/* <div>
          <img
            src="https://static.skillshare.com/uploads/users/tmp/67305fda"
            alt="Image 1"
            className="image"
          />
          <div className="h-2 bg-gray-300">
            <div
              className="h-full bg-blue-500"
              style={{ width: '' }} // Set the width dynamically based on progress prop
            ></div>
          </div>
        </div> */}

        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 2"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        <img
          src="https://static.skillshare.com/uploads/users/tmp/67305fda"
          alt="Image 3"
          className="image"
        />
        {/* Add more images as needed */}
      </div>
    </>
  );
};

export default CustomSlider;
