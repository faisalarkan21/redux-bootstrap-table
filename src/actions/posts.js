import Axios from "axios";
import { getResponseMock } from "../utils/api";

export const FETCH_POSTS = "FETCH_POSTS";

export function fetchposts(data) {
  return {
    type: 'FETCH_POSTS',
    data
  };
}

export function getPostsThunk(params = "") {
  return dispatch => {
    return getResponseMock(`/posts${params}`)
      .then(data => {
        dispatch(fetchposts(data));
      })
      .catch(err => err);
  };
}
