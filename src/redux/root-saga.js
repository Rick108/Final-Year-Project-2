import { all, call } from '@redux-saga/core/effects';

import { userSagas } from './user/user.sagas';
import { profileSagas } from './profile/profile.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(profileSagas)]);
}
