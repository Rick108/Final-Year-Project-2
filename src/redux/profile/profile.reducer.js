import ProfileActionTypes from './profile.types';

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  isFetching: false,
  error: null
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ProfileActionTypes.FETCH_CURRENT_PROFILE_START:
      return {
        ...state,
        isFetching: true
      };

    case ProfileActionTypes.CREATE_PROFILE_SUCCESS:
    case ProfileActionTypes.FETCH_CURRENT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        isFetching: false,
        error: null
      };

    case ProfileActionTypes.CREATE_PROFILE_FAILURE:
    case ProfileActionTypes.FETCH_CURRENT_PROFILE_FAILURE:
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
