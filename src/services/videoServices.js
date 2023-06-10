import axios from './config';

export const fetchVideoByVideoId = async (videoId) => {
    return await axios.get(`/Video/GetVideoByVideoId?videoId=${videoId}`).then((response) => {
        return response;
    });
};