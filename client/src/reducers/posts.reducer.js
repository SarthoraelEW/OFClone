import { GET_POSTS_FOR_USER, GET_POSTS_FROM_CREATOR, LIKE_POST, UNLIKE_POST } from "../actions/posts.action";

const initialState = [];

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS_FOR_USER:
      return action.payload;

    case GET_POSTS_FROM_CREATOR:
      return action.payload;

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likes: [action.payload.userId, ...post.likes]
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
            return {
                ...post,
                likes: post.likes.filter((id) => id !== action.payload.userId)
            }
        }
        return post;
    });

    default:
      return state;
  }
};