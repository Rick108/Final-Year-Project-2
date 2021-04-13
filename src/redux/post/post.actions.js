import PostActionTypes from './post.types';

export const createPostStart = postText => ({
  type: PostActionTypes.CREATE_POST_START,
  payload: postText
});

export const createPostSuccess = post => ({
  type: PostActionTypes.CREATE_POST_SUCCESS,
  payload: post
});

export const createPostFailure = errorMessage => ({
  type: PostActionTypes.CREATE_POST_FAILURE,
  payload: errorMessage
});
