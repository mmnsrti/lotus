import {
  FETCH_ALL,
  UPDATE,
  CREATE,
  DELETE,
  LIKE,
  FETCH_POSTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  ADD_COMMENT,
} from "../constants/actionTypes";
const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_POSTS_BY_SEARCH:
      return { ...state, posts: action.payload };

    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
            
          }
          return post
        }),
      };
    default:
      return state;
  }
};

export default postsReducer;
