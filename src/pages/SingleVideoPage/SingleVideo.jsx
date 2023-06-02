import React from 'react';
import YouTubeVideo from '../../components/SingleVideo/YoutubeVideo';
import FromThisCreator from '../../components/SingleVideo/FromThisCreator';
import Related from '../../components/SingleVideo/Related';

const SingleVideo = () => {
    return (
        <>
            <YouTubeVideo />
            <FromThisCreator />
            <Related />
        </>
    );
};

export default SingleVideo;
