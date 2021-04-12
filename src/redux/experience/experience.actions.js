import ExperienceActionTypes from './experience.types';

// Fetch experiences actions

export const fetchExperiencesStart = profileUserId => ({
  type: ExperienceActionTypes.FETCH_EXPERIENCES_START,
  payload: profileUserId
});

export const fetchExperiencesSuccess = experiences => ({
  type: ExperienceActionTypes.FETCH_EXPERIENCES_SUCCESS,
  payload: experiences
});

export const fetchExperiencesFailure = errorMessage => ({
  type: ExperienceActionTypes.FETCH_EXPERIENCES_FAILURE,
  payload: errorMessage
});

// Add an experience actions

export const addExperienceStart = experienceData => ({
  type: ExperienceActionTypes.ADD_EXPERIENCE_START,
  payload: experienceData
});

export const addExperienceSuccess = experience => ({
  type: ExperienceActionTypes.ADD_EXPERIENCE_SUCCESS,
  payload: experience
});

export const addExperienceFailure = errorMessage => ({
  type: ExperienceActionTypes.ADD_EXPERIENCE_FAILURE,
  payload: errorMessage
});

// Delete an experience actions

export const deleteExperienceStart = expId => ({
  type: ExperienceActionTypes.DELETE_EXPERIENCE_START,
  payload: expId
});

export const deleteExperienceSuccess = expId => ({
  type: ExperienceActionTypes.DELETE_EXPERIENCE_SUCCESS,
  payload: expId
});

export const deleteExperienceFailure = errorMessage => ({
  type: ExperienceActionTypes.DELETE_EXPERIENCE_FAILURE,
  payload: errorMessage
});

// Clear experiences state from redux store
export const clearExperiences = () => ({
  type: ExperienceActionTypes.CLEAR_EXPERIENCES
});
