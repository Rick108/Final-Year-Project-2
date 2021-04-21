import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
import { setAlertStart } from '../alert/alert.actions';
import {
  addExperienceFailure,
  addExperienceSuccess,
  deleteExperienceFailure,
  deleteExperienceSuccess,
  fetchExperiencesFailure,
  fetchExperiencesSuccess
} from './experience.actions';
import ExperienceActionTypes from './experience.types';

// Fetch experiences sagas

export function* fetchExperiences({ payload }) {
  try {
    const experiencesRef = firestore.doc(`profiles/${payload}`).collection('experiences');
    const experiencesSnapshot = yield experiencesRef.get();

    const experiencesState = [];
    experiencesSnapshot.docs.forEach(exp => {
      experiencesState.push({
        id: exp.id,
        ...exp.data()
      });
    });

    yield put(fetchExperiencesSuccess(experiencesState));
  } catch (error) {
    yield put(fetchExperiencesFailure(error.message));
    yield put(setAlertStart('danger', 'Something went wrong while fetching experiences'));
  }
}

export function* onFetchExperiencesStart() {
  yield takeLatest(ExperienceActionTypes.FETCH_EXPERIENCES_START, fetchExperiences);
}

// Add an experience sagas

export function* addExperience({ payload }) {
  try {
    const experienceRef = firestore
      .doc(`profiles/${auth.currentUser.uid}`)
      .collection('experiences');

    yield experienceRef.add(payload);
    yield put(addExperienceSuccess(payload));
    yield put(setAlertStart('success', 'Experience added successfully!', 3000));
  } catch (error) {
    yield put(addExperienceFailure(error.message));
    yield put(setAlertStart('danger', error.message));
  }
}

export function* onAddExperienceStart() {
  yield takeLatest(ExperienceActionTypes.ADD_EXPERIENCE_START, addExperience);
}

// Delete an experience sagas

export function* deleteExperience({ payload }) {
  if (
    window.confirm(
      'Are you sure you want to delete this experience? This action cannot be undone.'
    )
  ) {
    try {
      const profileRef = firestore.doc(`profiles/${auth.currentUser.uid}`);
      if (profileRef.id !== auth.currentUser.uid) {
        yield put(deleteExperienceFailure('Not authorized to delete this experience'));
        yield put(setAlertStart('danger', 'Not authorized to delete this experience'));
        return;
      }
      const experienceRef = profileRef.collection('experiences').doc(payload);
      yield experienceRef.delete();
      yield put(deleteExperienceSuccess(payload));
      yield put(setAlertStart('success', 'Experience deleted successfully!'));
    } catch (error) {
      yield put(deleteExperienceFailure(error.message));
      yield put(setAlertStart('danger', error.message));
    }
  } else {
    yield put(deleteExperienceFailure('Experience deletion cancelled'));
    yield put(setAlertStart('general', 'Experience deletion cancelled'));
  }
}

export function* onDeleteExperienceStart() {
  yield takeLatest(ExperienceActionTypes.DELETE_EXPERIENCE_START, deleteExperience);
}

// Root-Experience saga
export function* experienceSagas() {
  yield all([
    call(onFetchExperiencesStart),
    call(onAddExperienceStart),
    call(onDeleteExperienceStart)
  ]);
}
