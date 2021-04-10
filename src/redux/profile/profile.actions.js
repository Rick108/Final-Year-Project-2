import ProfileActionTypes from './profile.types';

// Create profile actions

export const createProfileStart = profileData => ({
  type: ProfileActionTypes.CREATE_PROFILE_START,
  payload: profileData
});

export const createProfileSuccess = profile => ({
  type: ProfileActionTypes.CREATE_PROFILE_SUCCESS,
  payload: profile
});

export const createProfileFailure = error => ({
  type: ProfileActionTypes.CREATE_PROFILE_FAILURE,
  payload: error
});

// Edit profile actions

export const editProfileStart = profileData => ({
  type: ProfileActionTypes.EDIT_PROFILE_START,
  payload: profileData
});

export const editProfileSuccess = profile => ({
  type: ProfileActionTypes.EDIT_PROFILE_SUCCESS,
  payload: profile
});

export const editProfileFailure = error => ({
  type: ProfileActionTypes.EDIT_PROFILE_FAILURE,
  payload: error
});

// Fetch current profile actions

export const fetchCurrentProfileStart = () => ({
  type: ProfileActionTypes.FETCH_CURRENT_PROFILE_START
});

export const fetchCurrentProfileSuccess = profile => ({
  type: ProfileActionTypes.FETCH_CURRENT_PROFILE_SUCCESS,
  payload: profile
});

export const fetchCurrentProfileFailure = error => ({
  type: ProfileActionTypes.FETCH_CURRENT_PROFILE_FAILURE,
  payload: error
});

// Clear profile from redux state

export const clearProfile = () => ({
  type: ProfileActionTypes.CLEAR_PROFILE
});
