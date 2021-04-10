import { combineReducers } from 'redux';

import profileReducer from './profile/profile.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
  user: userReducer,
  profile: profileReducer
});
