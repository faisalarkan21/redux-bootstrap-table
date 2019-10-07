import Axios from "axios";
import { getResponse, postResponse } from "../utils/api";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_SINGLE_USERS = "FETCH_SINGLE_USERS";

export function fetchUsers(data) {
  return {
    type: FETCH_USERS,
    data
  };
}

export function getUsersThunk(params = "") {
  return dispatch => {
    return getResponse(`/users${params}`)
      .then(data => {
        dispatch(fetchUsers(data));
      })
      .catch(err => err);
  };
}

export function fetchSingelUsers(data) {
  return {
    type: FETCH_SINGLE_USERS,
    data
  };
}

export function getSingelUserThunks(params = "") {
  return dispatch => {
    return getResponse(`/user${params}`)
      .then(({ data }) => {
        dispatch(fetchSingelUsers(data));
      })
      .catch(err => err);
  };
}

export function postUpdateUser(data) {
  return dispatch => {
    return postResponse(`/update-detail`, data)
      .catch(err => err);
  };
}

export function postUsersDeleteThunk(id = "") {
  return dispatch => {
    // console.log('asas')
    return postResponse(`/delete-user`, id).catch(err => err);
  };
}

export function postUsersUpdateThunk(data = "") {
  return dispatch => {
    // console.log('asas')
    return postResponse(`/update-user`, data).catch(err => err);
  };
}
