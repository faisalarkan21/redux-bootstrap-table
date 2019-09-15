import { FETCH_USERS } from "../actions/users";

export function getUsers(state = { data: { users: [] } }, action) {
  console.log("action users", action);
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}
