import axios from './config';
export const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get('/Account/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
