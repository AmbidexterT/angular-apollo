import { createSelector } from '@ngrx/store';
import { PostsState } from './post.reducer';
import { StateStore } from '@models/state-store';

export const selectFeature = (state: StateStore) => state.posts;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state: PostsState) => state.isLoading
);

export const postsSelector = createSelector(
  selectFeature,
  (state: PostsState) => state.posts
);

export const postsErrorSelector = createSelector(
  selectFeature,
  (state: PostsState) => state.error
);

export const totalPosts = createSelector(
  selectFeature,
  (state: PostsState) => state.total
);
