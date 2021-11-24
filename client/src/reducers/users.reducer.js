import { GET_SUBSCRIPTIONS_USERS, GET_USERS_FROM_CONVERSATIONS, GET_USERS_FROM_POST } from "../actions/users.action";

const initialState = {
  users: []
};

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case GET_SUBSCRIPTIONS_USERS:
      action.payload.forEach(newUser => {
        let found = false;
        state.users.forEach(oldUser => {
          if (newUser._id === oldUser._id) {
            oldUser = newUser;
            found = true
          }
        });
        if (!found) {
          state.users.push(newUser);
        }
      });
      return state;

    case GET_USERS_FROM_POST:
      action.payload.forEach(newUser => {
        let found = false;
        state.users.forEach(oldUser => {
          if (newUser._id === oldUser._id) {
            oldUser = newUser;
            found = true
          }
        });
        if (!found) {
          state.users.push(newUser);
        }
      });
      return state;

    case GET_USERS_FROM_CONVERSATIONS:
      action.payload.forEach(newUser => {
        let found = false;
        state.users.forEach(oldUser => {
          if (newUser._id === oldUser._id) {
            oldUser = newUser;
            found = true
          }
        });
        if (!found) {
          state.users.push(newUser);
        }
      });
      return state;
    
    default:
      return state;
  }
};