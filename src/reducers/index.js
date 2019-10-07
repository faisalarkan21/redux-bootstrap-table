import { combineReducers } from "redux";
import { getUsers, getSingleUser } from "./users";
import { getPosts } from "./posts";

export default combineReducers({
  getUsers,
  getPosts,
  getSingleUser
});
