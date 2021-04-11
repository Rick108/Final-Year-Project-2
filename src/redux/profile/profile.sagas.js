import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
import {
  createProfileFailure,
  createProfileSuccess,
  editProfileFailure,
  editProfileSuccess,
  fetchCurrentProfileFailure,
  fetchCurrentProfileSuccess
} from './profile.actions';
import ProfileActionTypes from './profile.types';

// Create Profile sagas

export function* createProfile({ payload }) {
  try {
    const profileRef = firestore.collection('profiles').doc(auth.currentUser.uid);
    yield profileRef.set({
      ...payload,
      skills: payload.skills.split(',').map(skill => skill.trim())
    });
    yield put(createProfileSuccess(payload));
  } catch (error) {
    yield put(createProfileFailure(error));
  }
}

export function* onCreateProfileStart() {
  yield takeLatest(ProfileActionTypes.CREATE_PROFILE_START, createProfile);
}

// Edit Profile sagas

export function* editProfile({ payload }) {
  try {
    const profileRef = firestore.collection('profiles').doc(auth.currentUser.uid);
    const profileSnapshot = yield profileRef.get();
    if (!profileSnapshot.exists) {
      yield put(editProfileFailure('No profile found'));
    } else {
      yield profileRef.update({
        ...payload,
        skills: payload.skills.split(',').map(skill => skill.trim())
      });
      yield put(editProfileSuccess(payload));
    }
  } catch (error) {
    yield put(editProfileFailure(error));
  }
}

export function* onEditProfileStart() {
  yield takeLatest(ProfileActionTypes.EDIT_PROFILE_START, editProfile);
}

// Fetch current user's profile sagas

export function* onFetchCurrentProfile() {
  try {
    const profileRef = firestore.collection('profiles').doc(auth.currentUser.uid);
    const profileSnapshot = yield profileRef.get();
    if (profileSnapshot.exists) {
      yield put(fetchCurrentProfileSuccess(profileSnapshot.data()));
    } else {
      yield put(fetchCurrentProfileFailure('No profile found'));
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
  yield all([
    call(onFetchCurrentProfileStart),
    call(onCreateProfileStart),
    call(onEditProfileStart)
  ]);
}
