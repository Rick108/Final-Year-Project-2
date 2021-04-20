import AlertActionTypes from './alert.types';

const INITIAL_STATE = {
  alerts: []
};

const alertReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AlertActionTypes.SET_ALERT_SUCCESS:
      return {
        ...state,
        alerts: [...state.alerts, payload]
      };

    case AlertActionTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== payload)
      };

    default:
      return state;
  }
};

export default alertReducer;
