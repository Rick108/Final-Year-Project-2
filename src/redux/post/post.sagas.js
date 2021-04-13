import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
import { createPostFailure, createPostSuccess } from './post.actions';
import PostActionTypes from './post.types';

// Add a post sagas

export function* createPost({ payload }) {
  try {
    const postRef = firestore.collection('posts');

    const createdAt = new Date();
    const newPostObj = {
      text: payload,
      createdAt,
      user: {
        id: auth.currentUser.uid,
        displayName: auth.currentUser.displayName
      }
    };

    postRef.add(newPostObj);
    yield put(createPostSuccess(newPostObj));
  } catch (error) {
    yield put(createPostFailure(error.message));
  }
}

export function* onCreatePostStart() {
  yield takeLatest(PostActionTypes.CREATE_POST_START, createPost);
}

// Root-Post saga
export function* postSagas() {
  yield all([call(onCreatePostStart)]);
}
