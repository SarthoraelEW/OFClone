import {
  COMMENT_POST,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS_FOR_USER,
  GET_POSTS_FROM_CREATOR,
  LIKE_COMMENT,
  LIKE_POST,
  UNLIKE_COMMENT,
  UNLIKE_POST,
} from "../actions/posts.action";

const initialState = [];

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_FOR_USER:
      return action.payload;

    case GET_POSTS_FROM_CREATOR:
      return action.payload;

    case GET_POST:
      return [action.payload];

    case CREATE_POST:
      return state.concat([action.payload]);

    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likes: [action.payload.userId, ...post.likes],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likes: post.likes.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });

    case LIKE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          const newComments = post.comments;
          newComments.forEach((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.likes.push(action.payload.userId);
            }
          });
          return {
            ...post,
            comments: newComments,
          };
        }
        return post;
      });

    case UNLIKE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          const newComments = post.comments;
          newComments.forEach((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.likes = comment.likes.filter((id) => id !== action.payload.userId);
            }
          });
          return {
            ...post,
            comments: newComments
          };
        }
        return post;
      });

    case COMMENT_POST:
      return state.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            comments: action.payload.comments
          };
        }
        return post;
      });

    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            comments: action.payload.comments
          };
        }
        return post;
      });

    default:
      return state;
  }
}
