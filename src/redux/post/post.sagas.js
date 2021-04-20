import { all, call, put, takeLatest } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import {
  createPostFailure,
  createPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsSuccess,
  likePostFailure,
  likePostSuccess,
  unlikePostFailure,
  unlikePostSuccess
} from './post.actions';
import PostActionTypes from './post.types';
import firebase from '../../firebase/firebase.utils';
import { setAlertStart } from '../alert/alert.actions';

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
    yield put(
      setAlertStart('danger', 'Something went wrong while fetching the posts', 4000)
    );
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
      },
      likes: []
    };
    const newPostRef = yield postsRef.add(newPostObj);

    yield put(createPostSuccess({ id: newPostRef.id, ...newPostObj }));
    yield put(setAlertStart('success', 'Post created!', 3000));
  } catch (error) {
    yield put(createPostFailure(error.message));
    yield put(setAlertStart('danger', error.message));
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
      yield put(setAlertStart('success', 'Post deleted successfully!'));
    } catch (error) {
      yield put(deletePostFailure(error.message));
      yield put(setAlertStart('danger', error.message));
    }
  } else {
    yield put(deletePostFailure('Post deletion cancelled'));
    yield put(setAlertStart('general', 'Post deletion cancelled', 3000));
  }
}

export function* onDeletePostStart() {
  yield takeLatest(PostActionTypes.DELETE_POST_START, deletePost);
}

// Like a post sagas

export function* likePost({ payload: { postId, likeOwner } }) {
  try {
    const postRef = firestore.doc(`posts/${postId}`);

    let postSnapshot;

    postSnapshot = yield postRef.get();

    // if the post is already liked by the same user
    if (postSnapshot.data().likes.some(like => like === likeOwner)) {
      yield put(likePostFailure('Post already liked'));
      yield put(setAlertStart('danger', 'Post already liked', 3000));
      return;
    }

    yield postRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(likeOwner)
    });

    postSnapshot = yield postRef.get();

    yield put(
      likePostSuccess({
        postId: postId,
        likes: postSnapshot.data().likes
      })
    );
    yield put(setAlertStart('success', 'Post liked!', 3000));
  } catch (error) {
    yield put(likePostFailure(error.message));
    yield put(setAlertStart('danger', error.message));
  }
}

export function* onLikePostStart() {
  yield takeLatest(PostActionTypes.LIKE_POST_START, likePost);
}

// Unlike a post sagas

export function* unlikePost({ payload: { postId, likeOwner } }) {
  try {
    const postRef = firestore.doc(`posts/${postId}`);

    let postSnapshot;

    postSnapshot = yield postRef.get();

    // if the post is not yet liked by the same user
    if (!postSnapshot.data().likes.some(like => like === likeOwner)) {
      yield put(unlikePostFailure('Post not liked yet'));
      yield put(setAlertStart('danger', 'Post not liked yet', 3000));
      return;
    }

    yield postRef.update({
      likes: firebase.firestore.FieldValue.arrayRemove(likeOwner)
    });

    postSnapshot = yield postRef.get();

    yield put(
      unlikePostSuccess({
        postId: postId,
        likes: postSnapshot.data().likes
      })
    );
    yield put(setAlertStart('success', 'Post unliked!', 3000));
  } catch (error) {
    yield put(unlikePostFailure(error.message));
    yield put(setAlertStart('danger', error.message));
  }
}

export function* onUnlikePostStart() {
  yield takeLatest(PostActionTypes.UNLIKE_POST_START, unlikePost);
}

// Root-Post saga
export function* postSagas() {
  yield all([
    call(onFetchPostsStart),
    call(onCreatePostStart),
    call(onDeletePostStart),
    call(onLikePostStart),
    call(onUnlikePostStart)
  ]);
}
