import { all, call, put, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { removeAlertStart, setAlertSuccess } from './alert.actions';
import AlertActionTypes from './alert.types';

export function* setAlert({ payload }) {
  yield put(setAlertSuccess(payload));
}

export function* onSetAlertStart() {
  yield takeLatest(AlertActionTypes.SET_ALERT_START, setAlert);
}

export function* removeAlert({ payload }) {
  yield delay(payload.timeout);
  yield put(removeAlertStart(payload.id));
}

export function* onSetAlertSuccess() {
  yield takeEvery(AlertActionTypes.SET_ALERT_SUCCESS, removeAlert);
}

// Root-Alert saga
export function* alertSagas() {
  yield all([call(onSetAlertStart), call(onSetAlertSuccess)]);
}
// export function* alertSagas() {
//   yield all([call(onSetAlertStart)]);
// }
