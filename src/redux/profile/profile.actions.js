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

// Fetch a single profile actions

export const fetchProfileStart = id => ({
  type: ProfileActionTypes.FETCH_PROFILE_START,
  payload: id
});

export const fetchProfileSuccess = profile => ({
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
  payload: profile
});

export const fetchProfileFailure = error => ({
  type: ProfileActionTypes.FETCH_PROFILE_FAILURE,
  payload: error
});

// Fetch all profiles actions

export const fetchProfilesStart = () => ({
  type: ProfileActionTypes.FETCH_PROFILES_START
});

export const fetchProfilesSuccess = profiles => ({
  type: ProfileActionTypes.FETCH_PROFILES_SUCCESS,
  payload: profiles
});

export const fetchProfilesFailure = errorMessage => ({
  type: ProfileActionTypes.FETCH_PROFILES_FAILURE,
  payload: errorMessage
});

// Clear profile from redux state

export const clearProfile = () => ({
  type: ProfileActionTypes.CLEAR_PROFILE
});
