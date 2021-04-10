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

// Create/Edit profile sagas

export function* createOrEditProfile({ payload }) {
  const profileRef = firestore.doc(`users/${auth.currentUser.uid}`).collection('profile');
  const profileSnapshot = yield profileRef.get();
  if (!profileSnapshot.empty) {
    // edit profile
    try {
      const profileSnapshotToEdit = yield profileRef.limit(1).get();
      yield profileSnapshotToEdit.docs[0].ref.update({
        ...payload,
        skills: payload.skills.split(',').map(skill => skill.trim())
      });
      yield put(editProfileSuccess(payload));
    } catch (error) {
      console.error('Error while edit profile:', error);
      yield put(editProfileFailure(error));
    }
  } else {
    // create profile
    try {
      yield profileRef.add({
        ...payload,
        skills: payload.skills.split(',').map(skill => skill.trim())
      });
      yield put(createProfileSuccess(payload));
    } catch (error) {
      yield put(createProfileFailure(error));
    }
  }
}

export function* onCreateOrEditProfileStart() {
  yield takeLatest(ProfileActionTypes.CREATE_OR_EDIT_PROFILE_START, createOrEditProfile);
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
  yield all([call(onCreateOrEditProfileStart), call(onFetchCurrentProfileStart)]);
}
