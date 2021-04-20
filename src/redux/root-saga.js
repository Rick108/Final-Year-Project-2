import { all, call } from '@redux-saga/core/effects';

import { userSagas } from './user/user.sagas';
import { profileSagas } from './profile/profile.sagas';
import { experienceSagas } from './experience/experience.sagas';
import { educationSagas } from './education/education.sagas';
import { postSagas } from './post/post.sagas';
import { alertSagas } from './alert/alert.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(profileSagas),
    call(experienceSagas),
    call(educationSagas),
    call(postSagas),
    call(alertSagas)
  ]);
}
