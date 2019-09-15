import { combineReducers } from "redux";
import { getUsers } from "./users";
import { getPosts } from "./posts";

export default combineReducers({
  getUsers,
  getPosts
});
