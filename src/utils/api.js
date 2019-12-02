import Axios from "axios";

const BASE_URL = "http://18.222.190.185:3008/api"; // vps aws

export const getResponse = async params => {
  return await Axios.get(`${BASE_URL}${params}`).then(({ data }) => data);
};


export const postResponse = async (params, data) => {
  return await Axios.post(`${BASE_URL}${params}`, data).then(({ data }) => data);
};
