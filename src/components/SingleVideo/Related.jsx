import React, { useEffect, useState } from 'react';
import "./Related.css"
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { fetchRelatedVideos } from '../../services/videoServices';

const Related = () => {
    const { videoId } = useParams();
    const [list, setList] = useState();

    const fetchVideos = () => {
        fetchRelatedVideos(videoId ? videoId : 2)
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
                    <Link to={`/video/${video.videoid}`}>
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

            {/* <div className="button-container">
                <button className="button">SEE MORE</button>
            </div> */}

        </>
    );
};

export default Related;
