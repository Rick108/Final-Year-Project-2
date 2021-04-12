import { createSelector } from 'reselect';

const selectEducationState = state => state.education;

export const selectEducations = createSelector(
  [selectEducationState],
  education => education.educations
);

export const selectAreEducationsFetching = createSelector(
  [selectEducationState],
  education => education.loading
);
