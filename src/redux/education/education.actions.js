import EducationActionTypes from './education.types';

// Fetch educations actions

export const fetchEducationsStart = profileUserId => ({
  type: EducationActionTypes.FETCH_EDUCATIONS_START,
  payload: profileUserId
});

export const fetchEducationsSuccess = educations => ({
  type: EducationActionTypes.FETCH_EDUCATIONS_SUCCESS,
  payload: educations
});

export const fetchEducationsFailure = errorMessage => ({
  type: EducationActionTypes.FETCH_EDUCATIONS_FAILURE,
  payload: errorMessage
});

// Add an education actions

export const addEducationStart = educationData => ({
  type: EducationActionTypes.ADD_EDUCATION_START,
  payload: educationData
});

export const addEducationSuccess = education => ({
  type: EducationActionTypes.ADD_EDUCATION_SUCCESS,
  payload: education
});

export const addEducationFailure = errorMessage => ({
  type: EducationActionTypes.ADD_EDUCATION_FAILURE,
  payload: errorMessage
});

// Delete an education actions

export const deleteEducationStart = eduId => ({
  type: EducationActionTypes.DELETE_EDUCATION_START,
  payload: eduId
});

export const deleteEducationSuccess = eduId => ({
  type: EducationActionTypes.DELETE_EDUCATION_SUCCESS,
  payload: eduId
});

export const deleteEducationFailure = errorMessage => ({
  type: EducationActionTypes.DELETE_EDUCATION_FAILURE,
  payload: errorMessage
});

// Clear educations state from redux store
export const clearEducations = () => ({
  type: EducationActionTypes.CLEAR_EDUCATIONS
});
