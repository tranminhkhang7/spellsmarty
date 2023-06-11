import React, { useEffect, useRef, useState } from 'react';
import jsonData from '../../assets/subtitle.json';
import "./YoutubeVideo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons'; 
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { fetchVideoByVideoId } from '../../services/videoServices';
import NotFoundVideo from '../NotFoundVideo/NotFoundVideo';



const YouTubeVideo = () => {
    const { videoId } = useParams();
    const [videoSrcId, setVideoSrcId] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [channelName, setChannelName] = useState('');
    const [videoLevel, setVideoLevel] = useState('');
    const [videoLearntCount, setVideoLearntCount] = useState('');

    const [data, setData] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    const [isLoadSuccess, setIsLoadSuccess] = useState(true);

    const fetchVideo = () => {
        fetchVideoByVideoId(videoId)
            .then((res) => {
                // console.log("hehe", res.data);
                setVideoSrcId(res?.data?.srcId);
                setVideoTitle(res?.data?.title);
                setChannelName(res?.data?.channelName);
                setVideoLevel(res?.data?.level);
                setVideoLearntCount(res?.data?.learntCount);
                setData(JSON.parse(res?.data?.subtitle).events);
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
            playerRef.current = new window.YT.Player('youtube-player', {
                // height: 'auto',
                width: '100%',
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
    const correctLineToShow = useRef('');
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

                play(currentIndexLine + 1);
                inputRefs.current[currentIndexLine + 1][0].focus();
                // setCorrectLineToShow('You are correct!');
                correctLineToShow.current = 'You are correct!';
            }
            else {
                correctLineToShow.current = correctLine;
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

    if (!isLoadSuccess) return (<NotFoundVideo />); 
    else return (
        <>
            <div className="dictation-section">

                <div className='left-side'>
                    <div id="youtube-player"></div>
                    <h1>{videoTitle} <FontAwesomeIcon style={{ color: 'var(--golden-color)' }} icon={faCrown} /></h1>

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
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F4E6" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg> */}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F4E6" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg> */}
                </div>

                <div className='right-side'>
                    <div>
                        <div className="container-dictation">
                            <div className="box-dictation">
                                {data?.map((sub, index) => (
                                    <div
                                        className='wrap-dictation'
                                        key={index}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCirclePlay}
                                            className='icon-play'
                                            onClick={(e) => handleSubmit(e, true, index)} />
                                        {/* <svg
                                            style={{ cursor: 'pointer', display: 'inline', color: '#53483D', marginLeft: '10px', verticalAlign: 'middle' }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="currentColor"
                                            className="bi bi-play-circle-fill play-icon"
                                            viewBox="0 0 16 16"
                                            onClick={(e) => handleSubmit(e, true, index)}
                                        >
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                        </svg> */}
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


                                            {/* <input
                                                ref={ref => (inputRefs.current[index][0] = ref)}
                                                type="text"
                                                className="word-input"
                                                style={{ width: "50px" }}
                                                onKeyDown={(e) => handleKeyPress(e, index, 1)}
                                                onChange={(e) => handleInputChange(index, 0, e.target.value)}
                                            />


                                            <input
                                                ref={ref => (inputRefs.current[index][1] = ref)}
                                                type="text"
                                                className="word-input"
                                                style={{ width: "80px" }}
                                                onKeyDown={(e) => handleKeyPress(e, index, 2)}
                                                onChange={(e) => handleInputChange(index, 1, e.target.value)}
                                            />
                                            <input
                                                ref={ref => (inputRefs.current[index][2] = ref)}
                                                type="text"
                                                className="word-input"
                                                style={{ width: "30px" }}
                                                onKeyDown={(e) => handleKeyPress(e, index, 3, true)}
                                                onChange={(e) => handleInputChange(index, 2, e.target.value)}
                                            /> */}
                                            {/* <button className="button-check" onClick={(event) => handleFormSubmit(event, index)}>Check</button> */}
                                        </form>

                                    </div>

                                ))}

                            </div>
                        </div>


                        {correctLineToShow.current ?
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
                        }



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