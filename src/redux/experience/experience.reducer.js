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

    case ExperienceActionTypes.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: state.experiences.filter(exp => exp.id !== payload),
        isFetching: false,
        error: null
      };

    case ExperienceActionTypes.CLEAR_EXPERIENCES:
      return {
        ...state,
        experiences: [],
        isFetching: false,
        error: null
      };

    case ExperienceActionTypes.FETCH_EXPERIENCE_FAILURE:
    case ExperienceActionTypes.ADD_EXPERIENCE_FAILURE:
    case ExperienceActionTypes.DELETE_EXPERIENCE_FAILURE:
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
