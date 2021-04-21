import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  emailSignInLoading: false,
  googleSignInLoading: false,
  error: ''
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        emailSignInLoading: true,
        googleSignInLoading: false
      };
    case UserActionTypes.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        googleSignInLoading: true,
        emailSignInLoading: false
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        emailSignInLoading: false,
        googleSignInLoading: false
      };

    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        emailSignInLoading: false,
        googleSignInLoading: false,
        error: ''
      };

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        currentUser: null,
        emailSignInLoading: false,
        googleSignInLoading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default userReducer;
