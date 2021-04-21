import { createSelector } from 'reselect';

const selectExperienceState = state => state.experience;

export const selectExperiences = createSelector(
  [selectExperienceState],
  experience => experience.experiences
);

export const selectAreExperiencesLoading = createSelector(
  [selectExperienceState],
  experience => experience.loading
);
