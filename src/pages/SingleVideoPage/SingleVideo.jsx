import React, { useEffect } from 'react';
import YouTubeVideo from '../../components/SingleVideo/YoutubeVideo';
import FromThisCreator from '../../components/SingleVideo/FromThisCreator';
import Related from '../../components/SingleVideo/Related';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Navbar/Footer';

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
