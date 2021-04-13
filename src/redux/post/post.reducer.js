import PostActionTypes from './post.types';

const INITIAL_STATE = {
  post: null,
  posts: [],
  loading: false,
  error: ''
};

const postReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PostActionTypes.CREATE_POST_START:
      return {
        ...state,
        loading: true
      };

    case PostActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false,
        error: ''
      };

    case PostActionTypes.CREATE_POST_FAILURE:
      return {
        ...state,
        post: null,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default postReducer;
