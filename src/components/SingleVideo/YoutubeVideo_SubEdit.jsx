import React, { useEffect, useRef, useState } from 'react';
import jsonData from '../../assets/subtitle.json';
import './YoutubeVideo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlay, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { fetchVideoByVideoId } from '../../services/videoServices';
import NotFoundVideo from '../NotFoundVideo/NotFoundVideo';
import { Tooltip } from 'react-tooltip';

const YouTubeVideo_SubEdit = () => {
  // ------------------Modify this-------------------
  const [videoSrcId, setVideoSrcId] = useState('BtN-goy9VOY');
  // ------------------Modify this. other part: no care :))--------------------

  useEffect(() => {
    const JSONobj = JSON.parse(JSON.stringify(jsonData, null, 2)).events;
    setData(JSONobj);
  }, []);

  const [videoTitle, setVideoTitle] = useState('');
  const [channelName, setChannelName] = useState('');
  const [videoLevel, setVideoLevel] = useState('');
  const [videoLearntCount, setVideoLearntCount] = useState('');
  const [videoPremium, setVideoPremium] = useState('');

  const [data, setData] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const [isLoadSuccess, setIsLoadSuccess] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const [isCorrect, setIsCorrect] = useState([]);

  const updateLineCorrect = (index) => {
    setIsCorrect((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = true;
      return newArray;
    });
  };

  // const fetchVideo = () => {
  //     fetchVideoByVideoId(videoId)
  //         .then((res) => {
  //             // console.log("hehe", res.data);
  //             setVideoSrcId(res?.data?.srcId);
  //             setVideoTitle(res?.data?.title);
  //             setVideoPremium(res?.data?.premium);
  //             setChannelName(res?.data?.channelName);
  //             setVideoLevel(res?.data?.level);
  //             setVideoLearntCount(res?.data?.learntCount);
  //             setData(JSON.parse(res?.data?.subtitle)?.events);
  //             setIsCorrect(Array(res.data.subtitle ? JSON.parse(res?.data?.subtitle)?.events?.length + 1 : 1).fill(false));
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //             setIsLoadSuccess(false);
  //         });
  // };

  // useEffect(() => {
  //     fetchVideo();
  // }, []);

  function normalize(str) {
    if (str === undefined) {
    } else
      return str
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .toUpperCase()
        .replace('  ', ' ');
  }

  function countWords(str) {
    const trimmedString = str.trim().replace(/[^a-zA-Z0-9 ']/g, '');
    const words = trimmedString.split(/\s+/);
    const letterCounts = words.map((word) => word.length);
    return letterCounts;
  }

  function play(currentIndex) {
    clearTimeout(timeoutId);
    setTimeoutId(null);
    if (playerRef.current && playerRef.current.getCurrentTime) {
      playerRef.current.seekTo(data[currentIndex].tStartMs / 1000);
    }
    playerRef.current.playVideo();

    if (currentIndex < data.length) {
      const id = setTimeout(() => {
        // console.log(data[currentIndex].segs[0]['utf8']);
        playerRef.current.pauseVideo();
      }, data[currentIndex].dDurationMs);
      setTimeoutId(id);
    }
  }

  const playerRef = useRef(null);
  useEffect(() => {
    // Load YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API script is loaded
    window.onYouTubeIframeAPIReady = () => {
      setIsVideoReady(true);
      const container = document.getElementById('youtube-player');
      const width = container?.offsetWidth;
      const height = (width / 16) * 9; // Assuming 16:9 aspect ratio

      playerRef.current = new window.YT.Player('youtube-player', {
        height: `${height}px`,
        width: width,
        videoId: videoSrcId,
        playerVars: {
          autoplay: 0, // Disable autoplay
          disablekb: 1, // Disable keyboard controls
        },
      });
    };
  }, [videoSrcId]);

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [line, setLine] = useState('');
  const [correctLineToShow, setCorrectLineToShow] = useState('');
  // const correctLineToShow = useRef('');
  const handleSubmit = (e, isForcedPlay, currentIndexLine) => {
    const correctLine = data[currentIndexLine]?.segs[0]['utf8'];
    setCorrectLineToShow(correctLine);

    if (isForcedPlay) {
      play(currentIndexLine);
    } else {
      e.preventDefault();

      const line = (inputValues[currentIndexLine] ?? []).join(' ');

      if (normalize(line) === normalize(correctLine)) {
        // setCurrentIndex(currentIndexLine + 1);
        // setLine('');

        updateLineCorrect(currentIndexLine);

        play(currentIndexLine + 1);
        inputRefs.current[currentIndexLine + 1][0].focus();
        // setCorrectLineToShow('You are correct!');
        // correctLineToShow.current = 'You are correct!';
      } else {
        // correctLineToShow.current = correctLine;
        // setCorrectLineToShow("saii");
        // console.log("sai");
      }
    }
  };

  const inputRefs = useRef([]);
  for (let i = 0; i < data?.length + 1; i++) {
    inputRefs.current[i] = Array(100).fill(0);
  }

  const handleKeyPress = (event, currentIndexLine, currentIndex, isTheLast) => {
    const keyCode = event.keyCode || event.which;
    const inputValue = event.target.value;
    // setCorrectLineToShow('');

    if (keyCode === 32) {
      // Spacebar
      event.preventDefault();
      focusNextInput(currentIndexLine, currentIndex, isTheLast);
    } else if (keyCode === 8 || keyCode === 46) {
      // Backspace or Delete
      const previousIndex = currentIndex - 2;
      if (previousIndex >= 0 && inputValue === '') {
        event.preventDefault();
        focusPreviousInput(currentIndexLine, previousIndex);
      }
    } else if (keyCode === 13) {
      // Enter
      handleSubmit(event, false, currentIndexLine);
    } else if (keyCode === 17) {
      // Control
      clearTimeout(timeoutId);
      setTimeoutId(null);
      play(currentIndexLine);
    }
  };

  const focusNextInput = (currentIndexLine, nextIndex, isTheLast) => {
    if (!isTheLast && nextIndex < inputRefs.current[currentIndexLine].length) {
      inputRefs.current[currentIndexLine][nextIndex].focus();
    }
  };

  const focusPreviousInput = (currentIndexLine, previousIndex) => {
    if (previousIndex >= 0) {
      inputRefs.current[currentIndexLine][previousIndex].focus();
    }
  };

  const [inputValues, setInputValues] = useState([]);
  const handleInputChange = (indexLine, indexWord, value) => {
    const newInputValues = [...inputValues];
    if (!newInputValues[indexLine]) {
      newInputValues[indexLine] = [];
    }
    newInputValues[indexLine][indexWord] = value;
    setInputValues(newInputValues);
  };

  const handleFormSubmit = (event, formId) => {
    event.preventDefault();
  };

  const handleReport = () => {
    console.log('hello report');
  };

  function handleReload() {
    window.location.reload();
  }

  if (!isLoadSuccess) return <NotFoundVideo />;
  else
    return (
      <>
        <div className="dictation-section">
          <div className="left-side">
            <div id="youtube-player"></div>
            {isVideoReady ? (
              <>
                <h1>{videoTitle}</h1>

                {videoPremium ? (
                  <div className="PREMIUM-tag">
                    <div
                      className="box"
                      data-tooltip-id="premium-tooltip"
                      data-tooltip-content="This is one of our Premium videos. Only subscribed users can dictate this."
                    >
                      <h4 className="text">PREMIUM</h4>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="creator-level">
                  <h2>{channelName}</h2>
                  <div className="box">
                    <h4 className="text">{videoLevel} Level hehe</h4>
                  </div>
                </div>
                <h3>
                  {videoLearntCount}
                  {videoLearntCount >= 2 ? <> writes </> : <> write</>}
                </h3>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h1>Something went wrong.</h1>
                <h3>
                  Sorry about that! Please &nbsp;
                  <span
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => handleReload()}
                  >
                    try again.
                  </span>
                </h3>
              </div>
            )}
          </div>

          <div className="right-side">
            <div>
              {!data ? (
                <div className="upgrage-info">
                  Please &nbsp;
                  <Link to="/profile" style={{ textDecoration: 'underline' }}>
                    UPGRADE
                  </Link>
                  &nbsp; to dictate this video!
                </div>
              ) : (
                <></>
              )}

              <div className="container-dictation">
                <div className="box-dictation">
                  {data?.map((sub, index) => (
                    <div className="wrap-dictation" key={index}>
                      <div className="first-two-elements">
                        <FontAwesomeIcon
                          icon={faCirclePlay}
                          className="icon-play"
                          data-tooltip-id="play-tooltip"
                          data-tooltip-content="You can press Ctrl to replay."
                          onClick={(e) => handleSubmit(e, true, index)}
                        />
                        <form
                          onSubmit={(event) => handleFormSubmit(event, index)}
                          className="form-dictation"
                        >
                          {countWords(sub.segs[0]['utf8'])?.map((word, indexWord) => {
                            if (indexWord !== countWords(sub.segs[0]['utf8'])?.length - 1) {
                              return (
                                <input
                                  key={indexWord}
                                  ref={(ref) => (inputRefs.current[index][indexWord] = ref)}
                                  type="text"
                                  className="word-input"
                                  style={{ width: `${word * 12}px` }}
                                  onKeyDown={(e) => handleKeyPress(e, index, indexWord + 1)}
                                  onChange={(e) =>
                                    handleInputChange(index, indexWord, e.target.value)
                                  }
                                />
                              );
                            } else if (indexWord === countWords(sub.segs[0]['utf8'])?.length - 1) {
                              return (
                                <input
                                  key={indexWord}
                                  ref={(ref) => (inputRefs.current[index][indexWord] = ref)}
                                  type="text"
                                  className="word-input"
                                  style={{ width: `${word * 12}px` }}
                                  onKeyDown={(e) => handleKeyPress(e, index, indexWord + 1, true)}
                                  onChange={(e) =>
                                    handleInputChange(index, indexWord, e.target.value)
                                  }
                                />
                              );
                            }
                          })}
                        </form>
                      </div>
                      {isCorrect[index] ? (
                        <>
                          <FontAwesomeIcon icon={faCheck} id="icon-check"></FontAwesomeIcon>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* {correctLineToShow && correctLineToShow.length !== 0 ? */}
              <>
                <div className="correct-section">
                  <>{correctLineToShow}</>
                </div>
              </>
              {/* :
                                <></>
                            } */}

              {/* <button className="button-check" onClick={handleSubmit}>Check</button> */}
            </div>
          </div>
        </div>

        <Tooltip id="play-tooltip" />
        <Tooltip id="premium-tooltip" style={{ width: '250px' }} />
      </>
    );
};

export default YouTubeVideo_SubEdit;
