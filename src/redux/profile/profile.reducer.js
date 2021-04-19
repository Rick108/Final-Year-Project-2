import ProfileActionTypes from './profile.types';

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  isFetching: false,
  error: ''
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ProfileActionTypes.FETCH_PROFILE_START:
    case ProfileActionTypes.FETCH_PROFILES_START:
      return {
        ...state,
        isFetching: true
      };

    case ProfileActionTypes.CREATE_PROFILE_SUCCESS:
    case ProfileActionTypes.EDIT_PROFILE_SUCCESS:
    case ProfileActionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isFetching: false,
        error: ''
      };

    case ProfileActionTypes.FETCH_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: payload,
        isFetching: false
      };

    case ProfileActionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        isFetching: false,
        error: ''
      };

    case ProfileActionTypes.CREATE_PROFILE_FAILURE:
    case ProfileActionTypes.EDIT_PROFILE_FAILURE:
    case ProfileActionTypes.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        profile: null,
        isFetching: false,
        error: payload
      };

    default:
      return state;
  }
};

export default profileReducer;
