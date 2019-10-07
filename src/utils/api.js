import Axios from "axios";

const BASE_URL = "http://18.223.162.119:3008/api"; // vps aws
const BASE_URL_MOCK = "http://5d97fea19937f40014b68f28.mockapi.io/api/v1"; // mock api

export const getResponse = async params => {
  const data = await Axios.get(`${BASE_URL}${params}`).then(({ data }) => data);
  return data;
};

export const getResponseMock = async params => {
  const data = await Axios.get(`${BASE_URL_MOCK}${params}`).then(
    ({ data }) => data
  );
  return data;
};

export const postResponse = async (params, data) => {
  return await Axios.post(`${BASE_URL}${params}`, data).then(({ data }) => data);
};
