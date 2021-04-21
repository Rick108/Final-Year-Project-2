import EducationActionTypes from './education.types';

const INITIAL_STATE = {
  educations: [],
  loading: false,
  error: ''
};

const educationReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case EducationActionTypes.FETCH_EDUCATIONS_START:
      return {
        ...state,
        loading: true
      };

    case EducationActionTypes.FETCH_EDUCATIONS_SUCCESS:
      return {
        ...state,
        educations: payload,
        loading: false,
        error: ''
      };

    case EducationActionTypes.ADD_EDUCATION_START:
      return {
        ...state,
        loading: true
      };

    case EducationActionTypes.ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        educations: [payload, ...state.educations],
        loading: false,
        error: ''
      };

    case EducationActionTypes.DELETE_EDUCATION_START:
      return {
        ...state,
        loading: true
      };

    case EducationActionTypes.DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        educations: state.educations.filter(edu => edu.id !== payload),
        loading: false,
        error: ''
      };

    case EducationActionTypes.CLEAR_EDUCATIONS:
      return {
        ...state,
        educations: [],
        loading: false,
        error: ''
      };

    case EducationActionTypes.FETCH_EDUCATIONS_FAILURE:
    case EducationActionTypes.ADD_EDUCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default educationReducer;
