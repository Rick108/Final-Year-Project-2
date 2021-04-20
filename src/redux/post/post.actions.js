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

// Like a post actions

export const likePostStart = likePostObj => ({
  type: PostActionTypes.LIKE_POST_START,
  payload: likePostObj // object with postId and likeOwner (uid)
});

export const likePostSuccess = likePostObj => ({
  type: PostActionTypes.LIKE_POST_SUCCESS,
  payload: likePostObj // object with postId and likes[] of that post
});

export const likePostFailure = errorMessage => ({
  type: PostActionTypes.LIKE_POST_FAILURE,
  payload: errorMessage
});

// Unlike a post actions

export const unlikePostStart = unlikePostObj => ({
  type: PostActionTypes.UNLIKE_POST_START,
  payload: unlikePostObj // object with postId and unlikeOwner (uid)
});

export const unlikePostSuccess = unlikePostObj => ({
  type: PostActionTypes.UNLIKE_POST_SUCCESS,
  payload: unlikePostObj // object with postId and likes[] of that post
});

export const unlikePostFailure = errorMessage => ({
  type: PostActionTypes.UNLIKE_POST_FAILURE,
  payload: errorMessage
});

// Clear post state in redux action

export const clearPostState = () => ({
  type: PostActionTypes.CLEAR_POST_STATE
});
