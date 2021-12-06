import axios from "axios";

export const GET_POSTS_FROM_CREATOR = "GET_POSTS_FROM_CREATOR";
export const GET_POSTS_FOR_USER = "GET_POSTS_FOR_USER";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPostsFromCreator = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/get-posts-from-creator/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_POSTS_FROM_CREATOR, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getPostsForUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/get-posts-for-home-page/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_POSTS_FOR_USER, payload: res.data });
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);
      });
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { likerId: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data: { likerId: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};
