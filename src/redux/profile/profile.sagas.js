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
    const profilesRef = firestore.collection('profiles');
    yield profilesRef.add({
      userId: auth.currentUser.uid,
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
    const profilesCollection = yield firestore.collection('profiles').get();
    const currentUserProfileDocument = profilesCollection.docs.find(
      doc => doc.data().userId === auth.currentUser.uid
    );
    yield currentUserProfileDocument.ref.update({
      ...payload,
      skills: payload.skills.split(',').map(skill => skill.trim())
    });
    yield put(editProfileSuccess(payload));
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
    const profileCollections = yield firestore.collection('profiles').get();
    const currentUserProfile = profileCollections.docs.find(
      doc => doc.data().userId === auth.currentUser.uid
    );
    yield put(fetchCurrentProfileSuccess(currentUserProfile.data()));
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
