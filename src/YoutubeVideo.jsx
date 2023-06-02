import React, { useEffect, useRef, useState } from 'react';
import jsonData from './subtitle.json';
import "./YoutubeVideo.css"

const YouTubeVideo = () => {
    const [data, setData] = useState(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            // alert('Shift key pressed!');
        }
        else if (e.key === 'Enter') {
            // console.log('Submitted:', { line });
            // console.log(currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "");
            // playerRef.current.playVideo();
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
                },
            });
        };
    }, []);

    function normalize(str) {
        // while (str.search('  ') >= 0) str.replace('  ', ' ');
        return str.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase().replace('  ', ' ');
    }

    const handlePlay = () => {
        if (playerRef.current && playerRef.current.playVideo) {
            playerRef.current.playVideo();
        }
    };

    const handlePause = () => {
        if (playerRef.current && playerRef.current.pauseVideo) {
            playerRef.current.pauseVideo();
        }
    };

    const handleAdvance = () => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
            const currentTime = playerRef.current.getCurrentTime();
            const newTime = currentTime + 10;
            playerRef.current.seekTo(newTime);
        }
    };

    const handleRewind = () => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
            const currentTime = playerRef.current.getCurrentTime();
            const newTime = currentTime - 10;
            playerRef.current.seekTo(newTime);
        }
    };

    useEffect(() => {
        const JSONobj = JSON.parse(JSON.stringify(jsonData, null, 2)).events;
        setData(JSONobj);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const handleButtonClick = () => {
        console.log("hkhk", data[currentIndex].tStartMs, data[currentIndex].dDurationMs, data[currentIndex].segs[0]['utf8']);
        if (playerRef.current && playerRef.current.getCurrentTime) {
            playerRef.current.seekTo(data[currentIndex].tStartMs / 1000);
        }
        playerRef.current.playVideo();

        if (currentIndex < data.length) {
            setTimeout(() => {
                console.log(data[currentIndex].segs[0]['utf8']);
                playerRef.current.pauseVideo();
                setCurrentIndex(currentIndex + 1);
            }, data[currentIndex].dDurationMs);
        }
    };

    const [line, setLine] = useState('');
    const [correctLine, setCorrectLine] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log('Submitted:', { line });
        // console.log(currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "");
        const correctLine = currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "";

        if (normalize(line) === normalize(correctLine)) {
            // console.log("dung");
            setLine('');
            setCorrectLine('')
            if (playerRef.current && playerRef.current.getCurrentTime) {
                playerRef.current.seekTo(data[currentIndex].tStartMs / 1000);
            }
            playerRef.current.playVideo();

            if (currentIndex < data.length) {
                // console.log(data[currentIndex].segs[0]['utf8']);

                setTimeout(() => {
                    console.log(data[currentIndex].segs[0]['utf8']);
                    playerRef.current.pauseVideo();
                    setCurrentIndex(currentIndex + 1);
                }, data[currentIndex].dDurationMs);
            }
        }
        else {
            console.log("sai");
            setCorrectLine(correctLine);
        }

        // setCorrectLine(currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : '');

        // console.log('Submitted:', { line });
        // console.log(data[currentIndex].segs[0]['utf8']);
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

                            <button className="button-check" onClick={handleButtonClick}>Check</button>
                            <button className="button-skip" onClick={handleButtonClick}>Skip</button>
<br></br>
                            {correctLine}
                        </form>
                    </div>
                    {/* <div> */}
                    {/* <button onClick={handlePlay}>Play</button>
                        <button onClick={handlePause}>Pause</button>
                        <button onClick={handleAdvance}>Advance 10s</button>
                        <button onClick={handleRewind}>Rewind 10s</button> */}

                    {/* </div> */}


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
