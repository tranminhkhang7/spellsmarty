import React, { useEffect, useRef, useState } from 'react';
import jsonData from '../../assets/subtitle.json';
import "./YoutubeVideo.css"

const YouTubeVideo = () => {
    const [data, setData] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    function play(currentIndex) {
        if (playerRef.current && playerRef.current.getCurrentTime) {
            playerRef.current.seekTo(data[currentIndex].tStartMs / 1000);
        }
        playerRef.current.playVideo();

        if (currentIndex < data.length) {
            const id = setTimeout(() => {
                console.log(data[currentIndex].segs[0]['utf8']);
                playerRef.current.pauseVideo();
            }, data[currentIndex].dDurationMs);
            setTimeoutId(id);
        }
    }

    const handleKeyDown = (e) => {
        setCorrectLine('');
        if (e.key === 'Shift') {
            clearTimeout(timeoutId);
            setTimeoutId(null);
            play(currentIndex - 1);
        }
        else if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

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
                videoId: 'h6fcK_fRYaI',
                playerVars: {
                    autoplay: 0,
                    modestbranding: 1, // Hide YouTube branding             
                    controls: 0, // Hide control buttons
                },
            });
        };
    }, []);

    function normalize(str) {
        return str.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().replace('  ', ' ');
    }

    useEffect(() => {
        const JSONobj = JSON.parse(JSON.stringify(jsonData, null, 2)).events;
        setData(JSONobj);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [line, setLine] = useState('');
    const [correctLine, setCorrectLine] = useState('');
    const [showStatus, setShowStatus] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const correctLine = currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "";

        if (normalize(line) === normalize(correctLine) || currentIndex === 0) {
            setCurrentIndex(currentIndex + 1);
            console.log("keke", currentIndex);

            setLine('');
            setCorrectLine('')
            play(currentIndex);
        }
        else {
            console.log("sai");
            setCorrectLine(correctLine);
        }
    };

    return (
        <>
            <div className="dictation-section">

                <div className='left-side'>
                    <div id="youtube-player"></div>
                    <h1>Becoming A Nomad Changes My Life | Seb Bennett</h1>
                    <div className='creator-level'>
                        <h2>Seb Bennett</h2>
                        <div className="box">
                            <h4 className="text">B2 Level</h4>
                        </div>
                    </div>
                    <h3>12,345 views</h3>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F4E6" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F4E6" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                </div>

                <div className='right-side'>
                    <div>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <textarea
                                type="text"
                                className="textarea"
                                value={line}
                                onChange={(e) => setLine(e.target.value)}
                                onKeyDown={handleKeyDown}>
                            </textarea>

                            <button className="button-check" onClick={handleSubmit}>Check</button>
                            {(correctLine == '')
                                ?
                                <>
                                </>
                                :
                                <>
                                    <div className="box-correct-line">
                                        {correctLine}
                                    </div>
                                </>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YouTubeVideo;
