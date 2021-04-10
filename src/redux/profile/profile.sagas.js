import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
import {
  createProfileFailure,
  createProfileSuccess,
  fetchCurrentProfileFailure,
  fetchCurrentProfileSuccess
} from './profile.actions';
import ProfileActionTypes from './profile.types';

// Create profile sagas

export function* createProfile({ payload }) {
  const profileRef = firestore.doc(`users/${auth.currentUser.uid}`).collection('profile');
  const profileSnapshot = yield profileRef.get();
  if (!profileSnapshot.empty) {
    return;
  } else {
    try {
      yield profileRef.add({ ...payload });
      yield put(createProfileSuccess(payload));
    } catch (error) {
      yield put(createProfileFailure(error));
    }
  }
}

export function* onCreateProfileStart() {
  yield takeLatest(ProfileActionTypes.CREATE_PROFILE_START, createProfile);
}

// Fetch current profile sagas

export function* onFetchCurrentProfile() {
  try {
    const profileRef = yield firestore
      .doc(`users/${auth.currentUser.uid}`)
      .collection('profile')
      .get();

    if (profileRef.empty) {
      yield put(fetchCurrentProfileFailure('No profile'));
    } else {
      yield put(
        fetchCurrentProfileSuccess({
          id: profileRef.docs[0].id,
          ...profileRef.docs[0].data()
        })
      );
    }
  } catch (error) {
    yield put(fetchCurrentProfileFailure(error));
  }
}

export function* onFetchCurrentProfileStart() {
  yield takeLatest(ProfileActionTypes.FETCH_CURRENT_PROFILE_START, onFetchCurrentProfile);
}

// Root-Profile saga
export function* profileSagas() {
  yield all([call(onCreateProfileStart), call(onFetchCurrentProfileStart)]);
}
