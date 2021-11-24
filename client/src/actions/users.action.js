import axios from "axios";

export const GET_SUBSCRIPTIONS_USERS = "GET_SUBSCRIPTIONS_USER";
export const GET_USERS_FROM_POST = "GET_USERS_FROM_POST";
export const GET_USERS_FROM_CONVERSATIONS = "GET_USERS_FROM_CONVERSATIONS";

export const getSubscriptionsUsers = (uid) => {
  return (dispatch) => {
    return axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/get-subscriptions-users/${uid}`,
        withCredentials: true
    })
    .then((res) => {
      dispatch({ type: GET_SUBSCRIPTIONS_USERS, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};

export const getUsersFromPost = (postId) => {
  return (dispatch) => {
    return axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/get-users-from-post/${postId}`,
        withCredentials: true
    })
    .then((res) => {
      dispatch({ type: GET_USERS_FROM_POST, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};

export const getUsersFromConversations = (uid) => {
  return (dispatch) => {
    return axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/get-users-from-conversations/${uid}`,
        withCredentials: true
    })
    .then((res) => {
      dispatch({ type: GET_USERS_FROM_CONVERSATIONS, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};