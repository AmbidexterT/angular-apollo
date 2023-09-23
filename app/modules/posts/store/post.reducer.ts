import { Action, createReducer, on } from '@ngrx/store';
import {
  PostsActions,
  createPost,
  createPostError,
  createPostSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  loadPosts,
  loadPostsError,
  loadPostsSuccess,
} from './post.actions';
import { Post } from '@models/post';

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  total: number;
}

export const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  total: 0,
};

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts, total }) => ({
    ...state,
    posts: [...state.posts, ...posts],
    isLoading: false,
    error: null,
    total,
  })),
  on(PostsActions.loadPostsError, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(PostsActions.createPost, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PostsActions.createPostSuccess, (state, { post }) => ({
    ...state,
    posts: [post, ...state.posts],
    isLoading: false,
    error: null,
    total: state.total + 1,
  })),
  on(PostsActions.createPostError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(PostsActions.updatePost, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PostsActions.updatePostSuccess, (state, { post }) => ({
    ...state,
    posts: [
      ...state.posts.map((p) => {
        if (p.id === post.id) {
          return { ...p, ...post };
        }

        return p;
      }),
    ],
    isLoading: false,
    error: null,
  })),
  on(PostsActions.updatePostError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(PostsActions.deletePost, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(PostsActions.deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: [...state.posts.filter((post) => post.id !== id)],
    isLoading: false,
    error: null,
    total: state.total - 1,
  })),
  on(PostsActions.deletePostError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(PostsActions.loadPostFromSearch, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    total: 0,
  })),
  on(PostsActions.loadPostFromSearchSuccess, (state, { posts }) => ({
    ...state,
    posts,
    isLoading: false,
    error: null,
  })),
  on(PostsActions.loadPostFromSearchError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function reducers(state: PostsState | undefined, action: Action) {
  return postsReducer(state, action);
}
