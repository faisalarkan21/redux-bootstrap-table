import { FETCH_POSTS } from "../actions/posts";

export function getPosts(state = { data: [] }, action) {
  console.log("action", action);
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}
