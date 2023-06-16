import axios from './config';

export const fetchVideoByVideoId = async (videoId) => {
    if (!localStorage.getItem('token'))
        return await axios.get(`/Video/GetVideoByVideoId?videoId=${videoId}`).then((response) => {
            return response;
        });
    else
        return await axios.get(`/Video/GetVideoByVideoId?videoId=${videoId}`
            , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            }
        );
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

export const saveProgress = async (videoId, progress) => {
    const response = await axios.post('/Video/SaveProgress', null, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        params: {
            videoId: videoId,
            progress: progress,
        },
    });

    return response;
};
// catch trường hợp chưa login mà vô video premium
// đăng xuất bên admin