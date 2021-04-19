import PostActionTypes from './post.types';

// Fetch all posts actions

export const fetchPostsStart = () => ({
  type: PostActionTypes.FETCH_POSTS_START
});

export const fetchPostsSuccess = posts => ({
  type: PostActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts
});

export const fetchPostsFailure = errorMessage => ({
  type: PostActionTypes.FETCH_POSTS_FAILURE,
  payload: errorMessage
});

// Create a post actions

export const createPostStart = (postText, commentCreator) => ({
  type: PostActionTypes.CREATE_POST_START,
  payload: {
    postText,
    commentCreator
  }
});

export const createPostSuccess = post => ({
  type: PostActionTypes.CREATE_POST_SUCCESS,
  payload: post
});

export const createPostFailure = errorMessage => ({
  type: PostActionTypes.CREATE_POST_FAILURE,
  payload: errorMessage
});

// Delete a post actions

export const deletePostStart = postId => ({
  type: PostActionTypes.DELETE_POST_START,
  payload: postId
});

export const deletePostSuccess = postId => ({
  type: PostActionTypes.DELETE_POST_SUCCESS,
  payload: postId
});

export const deletePostFailure = errorMessage => ({
  type: PostActionTypes.DELETE_POST_FAILURE,
  payload: errorMessage
});
