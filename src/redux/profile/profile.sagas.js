import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
import {
  createProfileFailure,
  createProfileSuccess,
  editProfileFailure,
  editProfileSuccess,
  fetchCurrentProfileFailure,
  fetchCurrentProfileSuccess,
  fetchProfilesFailure,
  fetchProfilesSuccess
} from './profile.actions';
import ProfileActionTypes from './profile.types';

// Create Profile sagas

export function* createProfile({ payload }) {
  try {
    const profileRef = firestore.collection('profiles').doc(auth.currentUser.uid);
    yield profileRef.set({
      ...payload,
      skills: payload.skills.split(',').map(skill => skill.trim()),
      owner: auth.currentUser.displayName
    });
    yield put(createProfileSuccess(payload));
  } catch (error) {
    yield put(createProfileFailure(error.message));
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
    yield put(editProfileFailure(error.message));
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
    yield put(fetchCurrentProfileFailure(error.message));
  }
}

export function* onFetchCurrentProfileStart() {
  yield takeLatest(ProfileActionTypes.FETCH_CURRENT_PROFILE_START, onFetchCurrentProfile);
}

// Fetch all profiles sagas

export function* fetchProfiles() {
  try {
    const profilesCollection = yield firestore.collection('profiles').get();

    const profilesState = [];
    profilesCollection.docs.forEach(doc => {
      profilesState.push({
        id: doc.id,
        ...doc.data()
      });
    });

    yield put(fetchProfilesSuccess(profilesState));
  } catch (error) {
    yield put(fetchProfilesFailure(error.message));
  }
}

export function* onFetchProfilesStart() {
  yield takeLatest(ProfileActionTypes.FETCH_PROFILES_START, fetchProfiles);
}

// Root-Profile saga
export function* profileSagas() {
  yield all([
    call(onFetchCurrentProfileStart),
    call(onCreateProfileStart),
    call(onEditProfileStart),
    call(onFetchProfilesStart)
  ]);
}
