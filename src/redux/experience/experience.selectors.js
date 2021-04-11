import { createSelector } from 'reselect';

const selectExperienceState = state => state.experience;

export const selectExperiences = createSelector(
  [selectExperienceState],
  experience => experience.experiences
);

export const selectAreExperiencesFetching = createSelector(
  [selectExperienceState],
  experience => experience.isFetching
);
