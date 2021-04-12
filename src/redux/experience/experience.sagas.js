import { all, call, put, takeLatest } from 'redux-saga/effects';
import { auth, firestore } from '../../firebase/firebase.utils';
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

export function* fetchExperiences() {
  try {
    const experiencesRef = firestore
      .doc(`profiles/${auth.currentUser.uid}`)
      .collection('experiences');
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
  } catch (error) {
    console.error('Error while adding an experience:', error);
    yield put(addExperienceFailure(error.message));
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
        return;
      }
      const experienceRef = profileRef.collection('experiences').doc(payload);
      yield experienceRef.delete();
      yield put(deleteExperienceSuccess(payload));
    } catch (error) {
      yield put(deleteExperienceFailure(error.message));
    }
  } else {
    yield put(deleteExperienceFailure('Experience deletion cancelled'));
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
