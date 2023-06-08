import axios from './config';

export const fetchVideos = async () => {
  return await axios.get(`/Video`).then((response) => {
    return response;
  });
};

export const fetchVideosByUserId = async (userId) => {
  return await axios.get(`/Video/GetVideoByUserId?userId=${userId}`).then((response) => {
    return response;
  });
};
