import axios from './config';

export const fetchAllAccounts = async (token) => {
  return await await axios
    .get('/Account', {
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

export const updateAccountPremium = async (token, accountId, months) => {
  try {
    const response = await axios.put(
      '/Account',
      {
        accountId: accountId,
        months: months,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
