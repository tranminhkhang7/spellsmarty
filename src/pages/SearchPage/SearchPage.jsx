import React, { useEffect } from 'react';
import './SearchPage.css';
import Videos from '../../assets/videos';
import { useState } from 'react';
import VideoCard from '../../components/Search/VideoCard';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Related from '../../components/SingleVideo/Related';

const SearchPage = () => {
  const [queryParameters] = useSearchParams();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [keyword, setKeyword] = useState('');
  const [level, setLevel] = useState('');

  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://spellsmarty2.azurewebsites.net/api/Video',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {

    setKeyword(queryParameters.get('q') ? queryParameters.get('q') : '');
    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        // console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // console.log(keyword);

    setFilteredData(
      data.filter((videos) => videos.title.toLowerCase().includes(keyword.toLowerCase()))
    );
  }, [keyword, data]);

  useEffect(() => {
    setFilteredData(data.filter((video) => video.level.includes(level)));
  }, [level]);

  const searchDynamic = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(level);
    setFilteredData(
      data.filter(
        (video) =>
          video.title.toLowerCase().includes(keyword.toLocaleLowerCase()) &&
          video.level.includes(level)
      )
    );
  };

  const navigator = useNavigate();
  const handleClick = (videoId) => {
    navigator(`/video/${videoId}`);
  };

  const timeBuster = Date.now();

  const alteration = 1;
  return (
    <>
      <Navbar />
      {/* <Related /> */}
      <div className="search-section">
        {/* <div id="background-item"></div> */}
        <div className="flex items-center mb-4">
          <form action="/search" method="GET" className="w-full" onSubmit={handleSearch}>
            <div className="flex items-center border-2 border-black-50 content-center mb-10 text-lg">
              <input
                type="text"
                value={keyword}
                onChange={searchDynamic}
                placeholder="Search your favorite video"
                className="px-4 py-2 w-full hover:border-grey-300/50 focus:outline-none focus:ring-2 focus:ring-black text-center"
              />

            </div>
            <div className="flex items-center justify-between mb-4 text-lg">
              <select
                className="w-1/5 px-4 py-2 border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="" disabled hidden selected>
                  Level
                </option>
                <option value="">All</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>

              <select disabled className="w-1/5 px-4 py-2 border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                <option value="" disabled selected hidden>
                  Length
                </option>
                <option value="option1"> ~ 1 minutes</option>
                <option value="option2"> ~ 5 minutes</option>
                <option value="option3"> ~ 10 minutes</option>
                <option value="option3"> over 10 minutes</option>
              </select>

              <select
                disabled
                name="category"
                className="w-1/5 px-4 py-2 border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              >
                <option value="" disabled selected hidden>
                  Category
                </option>
                <option value="option1">Education</option>
                <option value="option2">Podcast</option>
                <option value="option3">Vlog</option>
              </select>

              <select disabled className="w-1/5 px-4 py-2 border border-gray-300 text-center text-grey-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                <option value="" disabled selected hidden>
                  Accent
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </form>
        </div>

        {alteration === 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredData.map((video, index) => (
              <VideoCard
                key={index}
                srcId={video.srcId}
                videoId={video?.videoid}
                thumbnail={video.thumbnailLink}
                //length={video.length}
                title={video.title}
                //channelAvatar={video.channel.avatar}
                channelName={video.channelName}
              //views={video.views}
              />
            ))}
          </div>
          :
          <div className="image-grid" style={{ marginLeft: '0px', marginRight: '0px' }}>
            {filteredData?.map((video, index) => (
              <Link to={`/video/${video.videoid}?upd=${timeBuster}`}>
                <div className="grid-item" key={index}
                // onClick={() => handleClick(video?.videoid)}
                >
                  <div className="grid-item-content">
                    <div className="grid-image">
                      <img src={video?.thumbnailLink} alt="Image 1" />
                    </div>
                    <div className="grid-title">
                      <div className="circular-image">
                        <img src="https://yt3.googleusercontent.com/ytc/AGIKgqOibtncbyNaJVeUjVotNRl0r00hkiUfYEEv5XmNdw=s176-c-k-c0x00ffffff-no-rj" alt="Image 1" />
                      </div>
                      <div className="title">
                        <div className="title-video">
                          {video?.title}
                        </div>
                        {
                          video?.premium ?
                            <div className='PREMIUM-tag' style={{ marginLeft: '20px', marginTop: '12px' }}>
                              <div className="box">
                                <h4 className="text">PREMIUM</h4>
                              </div>
                            </div>
                            :
                            <></>
                        }
                        <div className="creator">
                          {video?.channelName}
                        </div>
                        <div className="views">
                          {video?.learntCount} {video?.learntCount > 1 ? <>write</> : <>writes</>} · 1 year ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        }

      </div>
    </>
  );
};

export default SearchPage;
