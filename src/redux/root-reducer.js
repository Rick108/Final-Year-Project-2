import { combineReducers } from 'redux';

import profileReducer from './profile/profile.reducer';
import userReducer from './user/user.reducer';
import experienceReducer from './experience/experience.reducer';

export default combineReducers({
  user: userReducer,
  profile: profileReducer,
  experience: experienceReducer
});
