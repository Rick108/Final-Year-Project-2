import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);

export const selectEmailSignInLoading = createSelector(
  [selectUser],
  user => user.emailSignInLoading
);
export const selectGoogleSignInLoading = createSelector(
  [selectUser],
  user => user.googleSignInLoading
);

export const selectUserError = createSelector([selectUser], user => user.error);
