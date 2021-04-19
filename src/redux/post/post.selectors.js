import { createSelector } from 'reselect';

const postState = state => state.post;

export const selectPosts = createSelector([postState], post => post.posts);

export const selectArePostsLoading = createSelector([postState], post => post.loading);
