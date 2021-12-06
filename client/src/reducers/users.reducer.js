import { GET_SUBSCRIPTIONS_USERS, GET_USERS_FROM_CONVERSATIONS, GET_USERS_FROM_POST } from "../actions/users.action";

const initialState = {usersFromSubscriptions: [], usersFromConversations: [], usersFromSuggestions: [], usersFromPost: []};

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case GET_SUBSCRIPTIONS_USERS:
      return {
        ...state,
        usersFromSubscriptions: action.payload
      };

    case GET_USERS_FROM_POST:
      const users = state.usersFromPost;
      action.payload.forEach(newUser => {
        var found = false;
        users.forEach(x => {
          if (x._id === newUser._id) {
            x = newUser;
            found = true;
          }
        });
        if (!found) {
          users.push(newUser);
        }
      });
      return {
        ...state,
        usersFromPost: users
      };

    case GET_USERS_FROM_CONVERSATIONS:
      return {
        ...state,
        usersFromConversations: action.payload
      };
    
    default:
      return state;
  }
};