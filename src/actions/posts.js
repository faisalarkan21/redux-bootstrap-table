import Axios from "axios";
import { getResponseMock, getResponse } from "../utils/api";

export const FETCH_POSTS = "FETCH_POSTS";

export function fetchposts(data) {
  return {
    type: 'FETCH_POSTS',
    data
  };
}

export function getPostsThunk(params = "") {
  return dispatch => {
    return getResponse(`/posts${params}`)
      .then(data => {
        dispatch(fetchposts(data));
      })
      .catch(err => err);
  };
}
