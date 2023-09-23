import { PageQueryOptions } from '@models/page-query-options';
import { Post } from '@models/post';
import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction(
  '[Posts] Load Posts',
  props<{ options?: PageQueryOptions }>()
);
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[]; total: number }>()
);
export const loadPostsError = createAction(
  '[Posts] Load Posts Error',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Posts] Create Post',
  props<{ post: Post }>()
);
export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{ post: Post }>()
);
export const createPostError = createAction(
  '[Posts] Create Post Error',
  props<{ error: string }>()
);

export const updatePost = createAction(
  '[Posts] Update Post',
  props<{ post: Post }>()
);
export const updatePostSuccess = createAction(
  '[Posts] Update Post Success',
  props<{ post: Post }>()
);
export const updatePostError = createAction(
  '[Posts] Update Post Error',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[Posts] Delete Post',
  props<{ id: string }>()
);
export const deletePostSuccess = createAction(
  '[Posts] Delete Post Success',
  props<{ id: string }>()
);
export const deletePostError = createAction(
  '[Posts] Delete Post Error',
  props<{ error: string }>()
);

export const loadPostFromSearch = createAction(
  '[Posts] Load Posts from search',
  props<{ search: string }>()
);
export const loadPostFromSearchSuccess = createAction(
  '[Posts] Load Posts from search Success',
  props<{ posts: Post[] }>()
);
export const loadPostFromSearchError = createAction(
  '[Posts] Load Posts from search Error',
  props<{ error: string }>()
);

export const PostsActions = {
  loadPosts,
  loadPostsSuccess,
  loadPostsError,
  createPost,
  createPostSuccess,
  createPostError,
  updatePost,
  updatePostSuccess,
  updatePostError,
  deletePost,
  deletePostSuccess,
  deletePostError,
  loadPostFromSearch,
  loadPostFromSearchSuccess,
  loadPostFromSearchError,
};
