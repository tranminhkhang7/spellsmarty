import React, { useState, useEffect } from 'react';
import Video from './VideosTableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VideosTable({ selectedItems, videos, setVideos }) {
  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   setList(customers);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const [customers, setCustomers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchAllAccounts(localStorage.getItem('token'));
  //       setCustomers(response.data);
  //     } catch (error) {
  //       console.log('Error fetching users:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const [inputValue, setInputValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsInputEmpty(false);
  };

  // const handleSelectAll = () => {
  //   setSelectAll(!selectAll);
  //   setIsCheck(customers.map((li) => li.id));
  //   if (selectAll) {
  //     setIsCheck([]);
  //   }
  // };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  // const handleViewPlan = (customerId, subribeDate, endDate) => {
  //   console.log(`${subribeDate} ${endDate} ${customerId}`);
  //   setDate({ subribeDate, endDate });
  //   setSelectedCustomerId(customerId);
  //   setModalOpen(!modalOpen);
  // };

  const [singleVideo, setSingleVideo] = useState({});
  const handleUpdateVideo = (video) => {
    setSingleVideo(video);
    setModalOpen(!modalOpen);
  };
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <ToastContainer />
      <header className="px-5 py-5">
        <h2 className="text-lg font-semibold text-slate-800">
          All Videos <span className="text-slate-400 font-semibold">{videos.length}</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-sm font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {/* <th className="px-5 first:pl-5 last:pr-5 py-5 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th> */}
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap w-px">
                  <span className="sr-only">Favourite</span>
                </th> */}
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Video Id</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Rating</div>
                </th>
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Level</div>
                </th>
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold">Orders</div>
                </th> */}
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold">Add Date</div>
                </th>
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold text-left">Total spent</div>
                </th> */}
                <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <div className="font-semibold">Actions</div>
                </th>
                {/* <th className="px-4 first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {videos.map((video) => {
                return (
                  <Video
                    key={video.videoid}
                    id={video.videoid}
                    subtitle={video.subtitle}
                    srcId={video.srcId}
                    title={video.title}
                    rating={video.rating}
                    thumbnailLink={video.thumbnailLink}
                    channelName={video.channelName}
                    learntCount={video.learntCount}
                    videoDescription={video.videoDescription}
                    level={video.level}
                    addedDate={video.addedDate}
                    videoGenres={video.videoGenres}
                    premium={video.premium}
                    handleUpdateVideo={handleUpdateVideo}
                    video={video}
                  />
                );
              })}
            </tbody>
          </table>
          {modalOpen ? (
            <div className="fixed inset-0 w-full h-full z-40 flex justify-center  backdrop-blur overflow-auto ">
              <div
                className={`bg-white mt-12 shadow-2xl w-fit h-fit p-6 flex flex-col space-y-10 max-w-100 transform transition-transform ease-in-out duration-300 ${
                  modalOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                {/* Modal content */}{' '}
                <div className="text-lg font-semibold">
                  {singleVideo.title}
                  {singleVideo.premium ? (
                    <FontAwesomeIcon style={{ color: '#f1c40f' }} icon={faCrown} />
                  ) : null}
                </div>
                <div className="text-lg">
                  <img className="w-auto h-44 m-auto" src={singleVideo.thumbnailLink}></img>
                </div>
                <div className="text-lg">Channel: {singleVideo.channelName}</div>
                <div className="text-lg">Learnt: {singleVideo.learntCount}</div>
                <div className="grid grid-cols-3 gap-2">
                  {singleVideo.videoGenres.map((genre, index) => (
                    <div key={index} className="btn-xs bg-indigo-400">
                      {genre}
                    </div>
                  ))}
                </div>
                <div className="border border-indigo-400">
                  <textarea className="w-full p-2" value={singleVideo.videoDescription}></textarea>
                </div>
                {/* <div className="border-indigo-400">
                  <textarea
                    className="resize-y rounded-md w-full p-2 text-sm"
                    value={JSON.stringify(singleVideo.subtitle, null, 2)}
                    rows={10}
                    cols={80}
                  ></textarea>
                </div> */}
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleUpdateVideo}
                    className="btn-xs !text-lg bg-gray-300 hover:bg-gray-400 text-gray-800 mr-2"
                  >
                    Close
                  </button>
                  <button
                    onClick={null}
                    className="btn-xs !text-lg bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Extend
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideosTable;
