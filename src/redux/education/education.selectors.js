import { createSelector } from 'reselect';

const selectEducationState = state => state.education;

export const selectEducations = createSelector(
  [selectEducationState],
  education => education.educations
);

export const selectAreEducationsLoading = createSelector(
  [selectEducationState],
  education => education.loading
);
