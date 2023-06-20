import axios from './config';

export const fetchVideos = async () => {
  return await axios.get(`/Video`).then((response) => {
    return response;
  });
};

export const fetchVideosByUserId = async (token) => {
  return await await axios
    .get('/Video/GetVideoByUserId', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(
      (response) => {
        return response;
      },
      (error) => {
        var status = error.response.status;
      }
    );
};
