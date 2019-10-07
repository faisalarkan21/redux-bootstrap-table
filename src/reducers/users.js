import { FETCH_USERS, FETCH_SINGLE_USERS } from "../actions/users";

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

let defaultDetailUsers = {
  data: {
    id: "",
    name: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    country: "",
    job_title: "",
    city: "",
    phone: "",
    street_address: "",
    postal_code: "",
    avatar: ""
  }
};

export function getSingleUser(state = defaultDetailUsers, action) {
  switch (action.type) {
    case FETCH_SINGLE_USERS:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
}
