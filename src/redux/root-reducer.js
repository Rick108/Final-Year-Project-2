import { combineReducers } from 'redux';

import profileReducer from './profile/profile.reducer';
import userReducer from './user/user.reducer';
import experienceReducer from './experience/experience.reducer';
import educationReducer from './education/education.reducer';
import postReducer from './post/post.reducer';
import alertReducer from './alert/alert.reducer';

export default combineReducers({
  user: userReducer,
  profile: profileReducer,
  experience: experienceReducer,
  education: educationReducer,
  post: postReducer,
  alert: alertReducer
});
