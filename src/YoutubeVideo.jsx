import React, { useEffect, useRef, useState } from 'react';
import jsonData from './subtitle.json';

const YouTubeVideo = () => {
    const [data, setData] = useState(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            // alert('Shift key pressed!');
        }
        // else if (e.key === 'Enter') {
        //     console.log('Submitted:', { line });
        //     console.log(currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "");
        //     // playerRef.current.playVideo();
        // }
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
                height: '315',
                width: '560',
                videoId: 'h6fcK_fRYaI',
                playerVars: {
                    autoplay: 0,
                },
            });
        };
    }, []);

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
    // const [correctLine, setCorrectLine] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log('Submitted:', { line });
        // console.log(currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "");
        const correctLine = currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : "";

        if (line === correctLine) {
            // console.log("dung");
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
        }

        // setCorrectLine(currentIndex > 0 ? data[currentIndex - 1].segs[0]['utf8'] : '');

        // console.log('Submitted:', { line });
        // console.log(data[currentIndex].segs[0]['utf8']);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div id="youtube-player"></div>

                <form
                    style={{ paddingLeft: "50px" }}
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={line}
                        onChange={(e) => setLine(e.target.value)}
                        onKeyDown={handleKeyDown}>
                    </input>
                </form>

                <div>
                    <button onClick={handlePlay}>Play</button>
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleAdvance}>Advance 10s</button>
                    <button onClick={handleRewind}>Rewind 10s</button>
                    <button onClick={handleButtonClick}>Log Next</button>
                    {/* {correctLine} */}
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
