import axios from "axios";

export const GET_POSTS_FROM_CREATOR = "GET_POSTS_FROM_CREATOR";
export const GET_POSTS_FOR_USER = "GET_POSTS_FOR_USER";
export const GET_POST = "GET_POST";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const UNLIKE_COMMENT = "UNLIKE_COMMENT";
export const COMMENT_POST = "COMMENT_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

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
        console.log(err);
      });
  };
};

export const getPost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/get-post/${postId}`,
      withCredentials: true
    })
    .then((res) => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

export const createPost = (newPost, files, uid, isPublic) => {
  const formData = new FormData();
  formData.append("message", newPost);
  formData.append("posterId", uid);
  formData.append("isPublic", isPublic);
  for (let i = 0; i < files.length; i++)
    formData.append("files", files[i].file);

  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/create-post`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
      .then((res) => {
        dispatch({ type: CREATE_POST, payload: res.data })
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}api/post/delete-post/${postId}`)
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId }})
      })
      .catch((err) => {
        console.log(err);
      })
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

export const likeComment = (postId, commentId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-comment/` + postId,
      data: {
        commentId: commentId,
        likerId: userId
      }
    })
    .then((res) => {
      dispatch({ type: LIKE_COMMENT, payload: { postId, commentId, userId}});
    })
    .catch((err) => console.log(err));
  };
};

export const unlikeComment = (postId, commentId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-comment/` + postId,
      data: {
        commentId: commentId,
        likerId: userId
      }
    })
    .then((res) => {
      dispatch({ type: UNLIKE_COMMENT, payload: { postId, commentId, userId}});
    })
    .catch((err) => console.log(err));
  };
};

export const commentPost = (postId, message, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/` + postId,
      data: {
        commenterId: userId,
        message: message
      }
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: COMMENT_POST, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment/` + postId,
      data: {
        commentId: commentId,
      }
    })
    .then((res) => {
      dispatch({ type: DELETE_COMMENT, payload: res.data});
    })
    .catch((err) => console.log(err));
  };
};