import React, { useEffect, useState } from 'react';
import "./Related.css"
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRelatedVideos } from '../../services/videoServices';

const Related = () => {
    const { videoId } = useParams();
    const [list, setList] = useState();

    const fetchVideos = () => {
        fetchRelatedVideos(videoId)
            .then((res) => {
                setList(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const navigate = useNavigate();

    const handleClick = (videoId) => {
        navigate(`/video/${videoId}`);
        navigate(0);
    };

    return (
        <>
            {list && list.length !== 0 ? <h2 style={{ marginLeft: '60px', marginTop: '19.92px', marginBottom: '19.92px', color: '#2C2C2C', fontWeight: 'bold', fontSize: '26px' }}>Related</h2> : <></>}
            <div className="image-grid">

                {list?.map((video, index) => (
                    <div className="grid-item" key={index} onClick={() => handleClick(video?.videoid)}>
                        <div className="grid-item-content">
                            <div className="grid-image">
                                <img src={video?.thumbnailLink} alt="Image 1" />
                            </div>
                            <div className="grid-title">
                                <div className="circular-image">
                                    <img src="https://static.skillshare.com/uploads/users/tmp/67305fda" alt="Image 1" />
                                </div>
                                <div className="title">
                                    <div className="title-video">
                                        {video?.title}
                                    </div>
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
                ))}
            </div>

            {/* <div className="button-container">
                <button className="button">SEE MORE</button>
            </div> */}

        </>
    );
};

export default Related;
