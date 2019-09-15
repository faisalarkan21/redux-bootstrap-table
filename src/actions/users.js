import Axios from "axios";
import { getResponse } from "../utils/api";

export const FETCH_USERS = "FETCH_USERS";

export function fetchUsers(data) {
  return {
    type: "FETCH_USERS",
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
