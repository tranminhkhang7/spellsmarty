import axios from './config';

export const fetchVideoByVideoId = async (videoId) => {
    return await axios.get(`/Video/GetVideoByVideoId?videoId=${videoId}`).then((response) => {
        return response;
    });
};

export const fetchVideoByChannelName = async (channelName) => {
    return await axios.get(`/Video/GetVideosByCreator?creator=${channelName}`).then((response) => {
        return response;
    });
};

export const fetchRelatedVideos = async (videoId) => {
    return await axios.get(`/Video/GetVideoByGenre?videoId=${videoId}`).then((response) => {
        return response;
    });
};