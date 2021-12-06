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
      return {
        ...state,
        usersFromPost: action.payload
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