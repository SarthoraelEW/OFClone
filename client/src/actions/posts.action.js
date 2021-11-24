import axios from "axios";

export const GET_POSTS_FROM_CREATOR = "GET_POSTS_FROM_CREATOR";
export const GET_POSTS_FOR_USER = "GET_POSTS_FOR_USER";

export const getPostsFromCreator = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/get-posts-from-creator/${uid}`,
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: GET_POSTS_FROM_CREATOR, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};

export const getPostsForUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/get-posts-for-home-page/${uid}`,
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: GET_POSTS_FOR_USER, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};