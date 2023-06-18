import React, { useEffect, useRef, useState } from 'react';
// import jsonData from '../../assets/subtitle.json';
import "./YoutubeVideo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlay, faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { fetchVideoByVideoId, saveProgress } from '../../services/videoServices';
import NotFoundVideo from '../NotFoundVideo/NotFoundVideo';
import { Tooltip } from 'react-tooltip'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YouTubeVideo = () => {
    // const [videoId, setVideoId] = useState('')
    const { videoId } = useParams();
    const [videoSrcId, setVideoSrcId] = useState('');
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

    const updateLineCorrect = (index, status) => {
        setIsCorrect((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = status;
            return newArray;
        });
    };

    const fetchVideo = () => {
        fetchVideoByVideoId(videoId)
            .then((res) => {
                // console.log("hehe", res.data);
                setVideoSrcId(res?.data?.srcId);
                setVideoTitle(res?.data?.title);
                setVideoPremium(res?.data?.premium);
                setChannelName(res?.data?.channelName);
                setVideoLevel(res?.data?.level);
                setVideoLearntCount(res?.data?.learntCount);
                setData(JSON.parse(res?.data?.subtitle)?.events);
                // console.log(res?.data?.progress);
                // setIsCorrect(Array(res.data.subtitle ? JSON.parse(res?.data?.subtitle)?.events?.length + 1 : 1).fill(null));
                const progressArr = res?.data?.progress?.split(" ").map(Number);
                const arr = Array(res.data.subtitle ? JSON.parse(res?.data?.subtitle)?.events?.length + 1 : 1).fill(null);

                if (progressArr)
                    progressArr.forEach((index) => {
                        if (index < arr.length) {
                            arr[index] = true;
                        }
                    });

                setIsCorrect(arr);
            })
            .catch((err) => {
                console.log(err);
                setIsLoadSuccess(false);
            });
    };

    const fetchSaveProgress = (videoIdString, progress) => {
        saveProgress(videoIdString, progress)
            .then((res) => {
                console.log("proo", res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    useEffect(() => {
        console.log("bennh");
        const notify = () => toast("You are not logged in yet. All your progress will not be saved! ");
        if (!localStorage.getItem('token')) notify();
    }, []);

    function normalize(str) {
        if (str === undefined) { } else
            return str.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().replace('  ', ' ');
    }

    function countWords(str) {
        const trimmedString = str.trim().replace(/[^a-zA-Z0-9 ']/g, '');
        const words = trimmedString.split(/\s+/);
        // const letterCounts = words.map(word => word.length);
        // return letterCounts;
        return words;
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
                    controls: 0, // Disable default controls
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
        if (isForcedPlay) {
            play(currentIndexLine);
        } else {
            e.preventDefault();

            const line = (inputValues[currentIndexLine] ?? []).join(' ');
            const correctLine = data[currentIndexLine]?.segs[0]['utf8'];

            if (normalize(line) === normalize(correctLine)) {
                // setCurrentIndex(currentIndexLine + 1);
                // setLine('');

                fetchSaveProgress(videoId, currentIndexLine);
                updateLineCorrect(currentIndexLine, true);

                play(currentIndexLine + 1);
                inputRefs.current[currentIndexLine + 1][0].focus();
                // setCorrectLineToShow('You are correct!');
                // correctLineToShow.current = 'You are correct!';
            }
            else {
                updateLineCorrect(currentIndexLine, false);
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

        if (keyCode === 32) { // Spacebar
            event.preventDefault();
            focusNextInput(currentIndexLine, currentIndex, isTheLast);
        } else if (keyCode === 8 || keyCode === 46) { // Backspace or Delete
            const previousIndex = currentIndex - 2;
            if (previousIndex >= 0 && inputValue === '') {
                event.preventDefault();
                focusPreviousInput(currentIndexLine, previousIndex);
            }
        } else if (keyCode === 13) { // Enter            
            handleSubmit(event, false, currentIndexLine);
        } else if (keyCode === 17) { // Control
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
        console.log("hello report");
    }

    function handleReload() {
        window.location.reload()
    } 
    
    

    if (!isLoadSuccess) return (<NotFoundVideo />);
    else
        return (
            <>
                <div className="dictation-section">
                    <div className='left-side'>

                        <div id="youtube-player"></div>
                        {isVideoReady ?
                            <>
                                <h1>{videoTitle}</h1>

                                {videoPremium
                                    ?
                                    <div className='PREMIUM-tag'                                        >
                                        <div className="box"
                                            data-tooltip-id="premium-tooltip"
                                            data-tooltip-content="This is one of our Premium videos. Only subscribed users can dictate this.">
                                            <h4 className="text">PREMIUM</h4>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }

                                <div className='creator-level'>
                                    <h2>{channelName}</h2>
                                    <div className="box">
                                        <h4 className="text">{videoLevel} Level</h4>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '16px' }}>
                                    {videoLearntCount}
                                    {videoLearntCount >= 2 ? <> writes </> : <> write</>}
                                </h3>
                            </>
                            :
                            <div style={{ textAlign: 'center' }}>
                                <h1>Something went wrong.</h1>
                                <h3>Sorry about that! Please &nbsp;
                                    <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleReload()}>
                                        try again
                                    </span>
                                    .
                                </h3>

                            </div>
                        }

                    </div>

                    <div className='right-side'>
                        <div>
                            {!data && localStorage.getItem('role') === 'Free'
                                ?
                                <div className="upgrage-info">
                                    Please
                                    &nbsp;<Link to='/profile' style={{ textDecoration: "underline" }}>UPGRADE</Link>&nbsp;
                                    to dictate this video!
                                </div>
                                : <></>
                            }

                            <div className="container-dictation">
                                <div className="box-dictation">
                                    {data?.map((sub, index) => (
                                        <div
                                            className='wrap-dictation'
                                            key={index}
                                        >
                                            <div className='first-two-elements'>
                                                <div className="icon-stack">
                                                    <FontAwesomeIcon
                                                        icon={faCirclePlay}
                                                        className='icon-play'
                                                        data-tooltip-id="play-tooltip"
                                                        data-tooltip-content="You can press Ctrl to replay."
                                                        onClick={(e) => handleSubmit(e, true, index)} />

                                                    <FontAwesomeIcon
                                                        icon={faCircleQuestion}
                                                        className='icon-question'
                                                        data-tooltip-id="correct-line-tooltip"
                                                        data-tooltip-content={data[index]?.segs[0]['utf8']} />
                                                </div>
                                                <form
                                                    onSubmit={(event) => handleFormSubmit(event, index)}
                                                    className="form-dictation"
                                                >
                                                    {countWords(sub.segs[0]['utf8'])?.map((word, indexWord) => {
                                                        if (indexWord !== countWords(sub.segs[0]['utf8'])?.length - 1) {
                                                            return (
                                                                <input
                                                                    key={indexWord}
                                                                    ref={ref => (inputRefs.current[index][indexWord] = ref)}
                                                                    type="text"
                                                                    className="word-input"
                                                                    defaultValue={isCorrect[index] === true ? word : ''}
                                                                    style={{ width: `${word.length * 12}px` }}
                                                                    onKeyDown={(e) => handleKeyPress(e, index, indexWord + 1)}
                                                                    onChange={(e) => handleInputChange(index, indexWord, e.target.value)}
                                                                />
                                                            );
                                                        } else if (indexWord === countWords(sub.segs[0]['utf8'])?.length - 1) {
                                                            return (
                                                                <input
                                                                    key={indexWord}
                                                                    ref={ref => (inputRefs.current[index][indexWord] = ref)}
                                                                    type="text"
                                                                    className="word-input"
                                                                    defaultValue={isCorrect[index] === true ? word : ''}
                                                                    style={{ width: `${word.length * 12}px` }}
                                                                    onKeyDown={(e) => handleKeyPress(e, index, indexWord + 1, true)}
                                                                    onChange={(e) => handleInputChange(index, indexWord, e.target.value)}
                                                                />
                                                            );
                                                        }
                                                    })}
                                                </form>
                                            </div>
                                            {
                                                isCorrect[index] === true ?
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        id='icon-check'>
                                                    </FontAwesomeIcon>
                                                    :
                                                    isCorrect[index] === false ?
                                                        <FontAwesomeIcon
                                                            icon={faXmark} shake
                                                            id='icon-x'>
                                                        </FontAwesomeIcon>
                                                        :
                                                        <></>
                                            }

                                            {/* <div className="correct-section">
                                                <>
                                                    {data[index].segs[0]['utf8']}
                                                    <FontAwesomeIcon
                                                        icon={faTriangleExclamation}
                                                        id='icon-flag'
                                                        onClick={() => handleReport()}
                                                    >
                                                    </FontAwesomeIcon>
                                                </>
                                            </div> */}

                                        </div>



                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <Tooltip id="play-tooltip" style={{ fontSize: '14px' }} />
                <Tooltip id="correct-line-tooltip" style={{ fontSize: '14px', width: '250px', textAlign: 'center' }} place='left' />
                <Tooltip id="premium-tooltip" style={{ fontSize: '14px', width: '250px' }} />
                <ToastContainer
                    position="bottom-center"
                    autoClose={7000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Zoom}
                    style={{fontSize: '18px'}}
                />
                

            </>
        );
};

export default YouTubeVideo;