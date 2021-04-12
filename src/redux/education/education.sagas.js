import { all, call, put, takeLatest } from 'redux-saga/effects';
import EducationActionTypes from './education.types';
import {
  addEducationFailure,
  addEducationSuccess,
  deleteEducationFailure,
  deleteEducationSuccess,
  fetchEducationsFailure,
  fetchEducationsSuccess
} from './education.actions';
import { auth, firestore } from '../../firebase/firebase.utils';

// Fetch educations sagas

export function* fetchEducations() {
  try {
    const educationsRef = firestore
      .doc(`profiles/${auth.currentUser.uid}`)
      .collection('educations');
    const educationsSnapshot = yield educationsRef.get();

    const educationsState = [];
    educationsSnapshot.docs.forEach(edu => {
      educationsState.push({
        id: edu.id,
        ...edu.data()
      });
    });

    yield put(fetchEducationsSuccess(educationsState));
  } catch (error) {
    yield put(fetchEducationsFailure(error));
  }
}

export function* onFetchEducationsStart() {
  yield takeLatest(EducationActionTypes.FETCH_EDUCATIONS_START, fetchEducations);
}

// Add an education sagas

export function* addEducation({ payload }) {
  try {
    const educationRef = firestore
      .doc(`profiles/${auth.currentUser.uid}`)
      .collection('educations');

    yield educationRef.add(payload);
    yield put(addEducationSuccess(payload));
  } catch (error) {
    yield put(addEducationFailure(error.message));
  }
}

export function* onAddEducationStart() {
  yield takeLatest(EducationActionTypes.ADD_EDUCATION_START, addEducation);
}

// Delete an education sagas

export function* deleteEducation({ payload }) {
  if (
    window.confirm(
      'Are you sure you want to delete this experience? This action cannot be undone.'
    )
  ) {
    try {
      const profileRef = firestore.doc(`profiles/${auth.currentUser.uid}`);
      if (profileRef.id !== auth.currentUser.uid) {
        yield put(deleteEducation('Not authorized to delete this education'));
        return;
      }
      const educationRef = profileRef.collection('educations').doc(payload);
      yield educationRef.delete();
      yield put(deleteEducationSuccess(payload));
    } catch (error) {
      yield put(deleteEducationFailure(error.message));
    }
  }
}

export function* onDeleteEducationStart() {
  yield takeLatest(EducationActionTypes.DELETE_EDUCATION_START, deleteEducation);
}

// Root-Education saga
export function* educationSagas() {
  yield all([
    call(onFetchEducationsStart),
    call(onAddEducationStart),
    call(onDeleteEducationStart)
  ]);
}
