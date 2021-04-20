import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
import { setAlertStart } from '../alert/alert.actions';
import {
  createProfileFailure,
  createProfileSuccess,
  editProfileFailure,
  editProfileSuccess,
  fetchProfileFailure,
  fetchProfilesFailure,
  fetchProfilesSuccess,
  fetchProfileSuccess
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
    yield put(setAlertStart('success', 'Profile created successfully!', 3000));
  } catch (error) {
    yield put(createProfileFailure(error.message));
    yield put(setAlertStart('danger', error.message));
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
      yield put(setAlertStart('success', 'Profile updated successfully!', 3000));
    }
  } catch (error) {
    yield put(editProfileFailure(error.message));
    yield put(setAlertStart('danger', error.message));
  }
}

export function* onEditProfileStart() {
  yield takeLatest(ProfileActionTypes.EDIT_PROFILE_START, editProfile);
}

// Fetch a single profile sagas

export function* fetchProfile({ payload }) {
  try {
    const profileRef = firestore.collection('profiles').doc(payload);
    const profileSnapshot = yield profileRef.get();
    if (profileSnapshot.exists) {
      yield put(
        fetchProfileSuccess({
          // since, in our firebase, profile document id = user id
          userId: profileSnapshot.id,
          ...profileSnapshot.data()
        })
      );
    } else {
      yield put(fetchProfileFailure('No profile found'));
    }
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
    yield put(
      setAlertStart('danger', 'Something went wrong while fetching this profile')
    );
  }
}

export function* onFetchProfileStart() {
  yield takeLatest(ProfileActionTypes.FETCH_PROFILE_START, fetchProfile);
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
    yield put(setAlertStart('danger', 'Something went wrong while fetching profiles'));
  }
}

export function* onFetchProfilesStart() {
  yield takeLatest(ProfileActionTypes.FETCH_PROFILES_START, fetchProfiles);
}

// Root-Profile saga
export function* profileSagas() {
  yield all([
    call(onFetchProfileStart),
    call(onCreateProfileStart),
    call(onEditProfileStart),
    call(onFetchProfilesStart)
  ]);
}
