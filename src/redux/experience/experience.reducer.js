import ExperienceActionTypes from './experience.types';

const INITIAL_STATE = {
  experiences: [],
  isFetching: false,
  error: null
};

const experienceReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ExperienceActionTypes.FETCH_EXPERIENCES_START:
      return {
        ...state,
        isFetching: true
      };

    case ExperienceActionTypes.FETCH_EXPERIENCES_SUCCESS:
      return {
        ...state,
        experiences: payload,
        isFetching: false,
        error: null
      };

    case ExperienceActionTypes.ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: [payload, ...state.experiences],
        isFetching: false,
        error: null
      };

    case ExperienceActionTypes.ADD_EXPERIENCE_FAILURE:
    case ExperienceActionTypes.FETCH_EXPERIENCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: payload
      };

    default:
      return state;
  }
};

export default experienceReducer;
