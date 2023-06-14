import React, { useEffect, useRef, useState } from 'react';
import jsonData from '../../assets/subtitle.json';
import "./YoutubeVideo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { fetchVideoByVideoId } from '../../services/videoServices';
import NotFoundVideo from '../NotFoundVideo/NotFoundVideo';



const YouTubeVideo = () => {
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

    const [isCorrect, setIsCorrect] = useState([]);

    const updateLineCorrect = (index) => {
        setIsCorrect((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = true;
            console.log(newArray);
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
                setData(JSON.parse(res?.data?.subtitle).events);
                setIsCorrect(Array(JSON.parse(res?.data?.subtitle).events?.length + 1).fill(false));

            })
            .catch((err) => {
                console.log(err);
                setIsLoadSuccess(false);
            });
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    function normalize(str) {
        if (str === undefined) { } else
            return str.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().replace('  ', ' ');
    }

    function countWords(str) {
        const trimmedString = str.trim().replace(/[^a-zA-Z0-9 ']/g, '');
        const words = trimmedString.split(/\s+/);
        const letterCounts = words.map(word => word.length);
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
            const container = document.getElementById('youtube-player');
            const width = container.offsetWidth;
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
    // const [correctLineToShow, setCorrectLineToShow] = useState('');
    // const correctLineToShow = useRef('');
    const handleSubmit = (e, isForcedPlay, currentIndexLine) => {
        if (isForcedPlay) {
            play(currentIndexLine);
        } else {
            e.preventDefault();

            const line = (inputValues[currentIndexLine] ?? []).join(' ');
            const correctLine = data[currentIndexLine]?.segs[0]['utf8'];

            // console.log("koko", line, data[currentIndexLine]?.segs[0]['utf8']);

            if (normalize(line) === normalize(correctLine)) {
                // setCurrentIndex(currentIndexLine + 1);
                // setLine('');

                updateLineCorrect(currentIndexLine);

                play(currentIndexLine + 1);
                inputRefs.current[currentIndexLine + 1][0].focus();
                // setCorrectLineToShow('You are correct!');
                // correctLineToShow.current = 'You are correct!';
            }
            else {
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






    // if (!isLoadSuccess) return (<NotFoundVideo />);
    // else 
    return (
        <>
            <div className="dictation-section">

                <div className='left-side'>
                    <div id="youtube-player"></div>
                    <h1>{videoTitle}</h1>

                    {videoPremium
                        ?
                        <div className='PREMIUM-tag'>
                            <div className="box">
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
                    <h3>
                        {videoLearntCount}
                        {videoLearntCount >= 2 ? <> writes </> : <> write</>}
                    </h3>
                </div>

                <div className='right-side'>
                    <div>
                        {videoPremium
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
                                            <FontAwesomeIcon
                                                icon={faCirclePlay}
                                                className='icon-play'
                                                onClick={(e) => handleSubmit(e, true, index)} />
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
                                                                style={{ width: `${word * 12}px` }}
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
                                                                style={{ width: `${word * 12}px` }}
                                                                onKeyDown={(e) => handleKeyPress(e, index, indexWord + 1, true)}
                                                                onChange={(e) => handleInputChange(index, indexWord, e.target.value)}
                                                            />
                                                        );
                                                    }
                                                })}
                                            </form>
                                        </div>
                                        {
                                            isCorrect[index] ?
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    id='icon-check'
                                                >
                                                </FontAwesomeIcon> :
                                                <></>
                                        }
                                        {/* <FontAwesomeIcon
                                            icon={faTriangleExclamation}
                                            id='icon-flag'
                                            onClick={() => handleReport()}
                                        >
                                        </FontAwesomeIcon> */}
                                    </div>

                                ))}

                            </div>
                        </div>


                        {/* {correctLineToShow.current ?
                            <>
                                <div className="correct-section">
                                    {correctLineToShow.current === 'You are correct!' ?
                                        <>
                                            <FontAwesomeIcon
                                                icon={faSquareCheck}
                                            /> &nbsp;
                                            <span style={{ color: '#2C542F' }}>{correctLineToShow.current}</span>

                                        </>
                                        :
                                        <>
                                            {correctLineToShow.current}
                                        </>}

                                </div>
                            </>
                            :
                            <>
                            </>
                        } */}



                        {/* <button className="button-check" onClick={handleSubmit}>Check</button> */}
                    </div>

                </div>
            </div>

            {/* <div>
                {data?.map((sub) => (
                    <div>
                        {sub.tStartMs} &nbsp;
                        {sub.dDurationMs} &nbsp;
                        {sub.segs[0]['utf8']}
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default YouTubeVideo;