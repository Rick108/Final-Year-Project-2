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
import { setAlertStart } from '../alert/alert.actions';

// Fetch educations sagas

export function* fetchEducations({ payload }) {
  try {
    const educationsRef = firestore.doc(`profiles/${payload}`).collection('educations');
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
    yield put(setAlertStart('danger', error.message));
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
    yield put(setAlertStart('success', 'Education added successfully!', 3000));
  } catch (error) {
    yield put(addEducationFailure(error.message));
    yield put(setAlertStart('danger', error.message));
  }
}

export function* onAddEducationStart() {
  yield takeLatest(EducationActionTypes.ADD_EDUCATION_START, addEducation);
}

// Delete an education sagas

export function* deleteEducation({ payload }) {
  if (
    window.confirm(
      'Are you sure you want to delete this education? This action cannot be undone.'
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
      yield put(setAlertStart('success', 'Education deleted successfully!'));
    } catch (error) {
      yield put(deleteEducationFailure(error.message));
      yield put(setAlertStart('danger', error.message));
    }
  } else {
    yield put(deleteEducationFailure('Education deletion cancelled'));
    yield put(setAlertStart('general', 'Education deletion cancelled'));
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
