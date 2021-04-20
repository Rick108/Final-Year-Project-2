import { createSelector } from 'reselect';

const selectAlertState = state => state.alert;

export const selectAlerts = createSelector([selectAlertState], alert => alert.alerts);
