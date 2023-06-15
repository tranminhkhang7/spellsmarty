import axios from './config';

export const fetchVideoByVideoId = async (videoId) => {
    return await axios.get(`/Video/GetVideoByVideoId?videoId=${videoId}`).then((response) => {
        return response;
    });
};

export const fetchVideoWithSameCreator = async (videoId) => {
    return await axios.get(`/Video/GetVideosByCreator?videoId=${videoId}`).then((response) => {
        return response;
    });
};

export const fetchRelatedVideos = async (videoId) => {
    return await axios.get(`/Video/GetVideoByGenre?videoId=${videoId}`).then((response) => {
        return response;
    });
};