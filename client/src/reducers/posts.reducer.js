import { GET_POSTS_FOR_USER, GET_POSTS_FROM_CREATOR } from "../actions/posts.action";

const initialState = {
  posts: []
};

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS_FOR_USER:
      action.payload.forEach(newPost => {
        let found = false;
        state.posts.forEach(oldPost => {
          if (newPost._id === oldPost._id) {
            oldPost = newPost;
            found = true
          }
        });
        if (!found) {
          state.posts.push(newPost);
        }
      });
      return state;

    case GET_POSTS_FROM_CREATOR:
      action.payload.forEach(newPost => {
        let found = false;
        state.posts.forEach(oldPost => {
          if (newPost._id === oldPost._id) {
            oldPost = newPost;
            found = true
          }
        });
        if (!found) {
          state.posts.push(newPost);
        }
      });
      return state;

    default:
      return state;
  }
};