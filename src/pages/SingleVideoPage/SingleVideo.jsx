import React, { useEffect, useState } from 'react';
import YouTubeVideo from '../../components/SingleVideo/YoutubeVideo';
import FromThisCreator from '../../components/SingleVideo/FromThisCreator';
import Related from '../../components/SingleVideo/Related';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Navbar/Footer';
import { fetchVideoByVideoId } from '../../services/videoServices';

const SingleVideo = () => {



    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Navbar />
            <YouTubeVideo />
            <FromThisCreator />
            <Related />
            <Footer />
        </>
    );
};

export default SingleVideo;
