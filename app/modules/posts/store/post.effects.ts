import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { PostsService } from 'src/app/services/posts.service';
import { PostsActions } from './post.actions';
import { catchError, concatMap, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class PostsEffects {
  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      concatMap(({ options }) => {
        return this.postsService.getPosts(options).pipe(
          map(({ posts, total }) =>
            PostsActions.loadPostsSuccess({ posts, total })
          ),
          catchError((e) =>
            of(PostsActions.loadPostsError({ error: e.message }))
          )
        );
      })
    );
  });

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      switchMap(({ post }) => {
        return this.postsService.create(post).pipe(
          map((createdPost) =>
            PostsActions.createPostSuccess({ post: createdPost })
          ),
          catchError((e) =>
            of(PostsActions.createPostError({ error: e.message }))
          )
        );
      })
    )
  );

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.updatePost),
      switchMap(({ post }) =>
        this.postsService.update(post).pipe(
          map((post) => PostsActions.updatePostSuccess({ post })),
          catchError((e) =>
            of(PostsActions.updatePostError({ error: e.message }))
          )
        )
      )
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.deletePost),
      mergeMap(({ id }) => {
        return this.postsService.delete(id).pipe(
          map((isDeleted) =>
            isDeleted
              ? PostsActions.deletePostSuccess({ id })
              : PostsActions.deletePostError({
                  error: "Couldn't delete post!",
                })
          ),
          catchError((e) =>
            of(PostsActions.deletePostError({ error: e.message }))
          )
        );
      })
    );
  });

  $loadPostsFromSearch = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.loadPostFromSearch),
      switchMap(({ search }) =>
        this.postsService
          .getPosts({
            search: {
              q: search,
            },
          })
          .pipe(
            map(({ posts }) =>
              PostsActions.loadPostFromSearchSuccess({ posts })
            ),
            catchError((e) =>
              of(PostsActions.loadPostFromSearchError({ error: e.message }))
            )
          )
      )
    );
  });

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
