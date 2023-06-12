import axios from './config';

export const fetchVerifyAccount = async (verifyToken) => {
  return await axios
    .post(`/Auth/verify`, {
      verifyToken: verifyToken
    })
    .then((response) => {
      return response;
    });
};
