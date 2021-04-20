import { v4 as uuid } from 'uuid';
import AlertActionTypes from './alert.types';

export const setAlertStart = (alertType, alertMsg, timeout = 5000) => {
  const id = uuid();

  return {
    type: AlertActionTypes.SET_ALERT_START,
    payload: {
      id,
      alertType,
      alertMsg,
      timeout
    }
  };
};

export const setAlertSuccess = alertObj => ({
  type: AlertActionTypes.SET_ALERT_SUCCESS,
  payload: alertObj // { id, alertType, alertMsg }
});

export const removeAlertStart = id => ({
  type: AlertActionTypes.REMOVE_ALERT,
  payload: id
});
