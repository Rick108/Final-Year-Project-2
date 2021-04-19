import { all, call, put, takeLatest } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import {
  createPostFailure,
  createPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsSuccess
} from './post.actions';
import PostActionTypes from './post.types';

// Fetch all posts sagas

export function* fetchPosts() {
  try {
    const postsCollection = yield firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get();

    const postsState = [];
    postsCollection.docs.forEach(doc => {
      postsState.push({
        id: doc.id,
        ...doc.data()
      });
    });

    yield put(fetchPostsSuccess(postsState));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export function* onFetchPostsStart() {
  yield takeLatest(PostActionTypes.FETCH_POSTS_START, fetchPosts);
}

// Add a post sagas

export function* createPost({ payload: { postText, commentCreator } }) {
  try {
    const postsRef = firestore.collection('posts');

    const createdAt = new Date().toISOString();
    const newPostObj = {
      text: postText,
      createdAt,
      user: {
        id: commentCreator.id,
        displayName: commentCreator.displayName
      }
    };

    const newPostRef = yield postsRef.add(newPostObj);
    yield put(createPostSuccess({ id: newPostRef.id, ...newPostObj }));
  } catch (error) {
    yield put(createPostFailure(error.message));
  }
}

export function* onCreatePostStart() {
  yield takeLatest(PostActionTypes.CREATE_POST_START, createPost);
}

// Delete a post sagas

export function* deletePost({ payload }) {
  if (window.confirm('Are you sure that you want to delete this post?')) {
    try {
      const postRef = firestore.collection('posts').doc(payload);
      yield postRef.delete();
      yield put(deletePostSuccess(payload));
    } catch (error) {
      yield put(deletePostFailure(error.message));
    }
  } else {
    yield put(deletePostFailure('Post deletion cancelled'));
  }
}

export function* onDeletePostStart() {
  yield takeLatest(PostActionTypes.DELETE_POST_START, deletePost);
}

// Root-Post saga
export function* postSagas() {
  yield all([call(onFetchPostsStart), call(onCreatePostStart), call(onDeletePostStart)]);
}
