// đây là service mẫu nè
import axios from "./config";
// import { readCookies } from "../utils/cookies/cookies"
export const fetchCreateNewUser = async (data) => {
  return await axios
    .post(`/accounts`, data, {
      headers: { Authorization: "Bearer " + "hehe" },
    })
    .then((response) => {
      return response;
    });
};
