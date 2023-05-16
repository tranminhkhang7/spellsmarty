import React, { useEffect, useRef, useState } from 'react';
import jsonData from './subtitle.json';

const YouTubeVideo = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // setData(JSON.parse(JSON.stringify(jsonData, null, 2)));
        const JSONobj = JSON.parse(JSON.stringify(jsonData, null, 2)).events;
        setData(JSONobj);
        console.log(JSONobj);
    }, []);

    const [line, setLine] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', { line });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Shift') {
            alert('Shift key pressed!');
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

    // if (!data) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div id="youtube-player"></div>

                <form
                    style={{ paddingLeft: "50px" }}
                    onSubmit={handleSubmit}>
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
                </div>
            </div>

            <div>
                {data?.map((sub) => (
                    <div>                        
                        {sub.dDurationMs}
                        {sub.tStartMs}
                        {sub.segs[0]['utf8']}
                    </div>
                ))}
            </div>
        </>
    );
};

export default YouTubeVideo;
