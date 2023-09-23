import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, map } from 'rxjs';
import { Post } from '@models/post';
import { PageQueryOptions } from '@models/page-query-options';
import { PostsWithTotal } from '@models/posts-with-total';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apollo: Apollo) {}

  getPosts(options?: PageQueryOptions): Observable<PostsWithTotal> {
    return this.apollo
      .query({
        query: gql`
          query getPosts($options: PageQueryOptions) {
            posts(options: $options) {
              data {
                id
                body
                title
              }
              meta {
                totalCount
              }
            }
          }
        `,
        variables: {
          options,
        },
      })
      .pipe(
        map((res: any) => ({
          posts: res.data?.posts?.data as Post[],
          total: res.data?.posts?.meta?.totalCount,
        }))
      );
  }

  create(post: Post): Observable<Post> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation createPost($post: CreatePostInput!) {
            createPost(input: $post) {
              id
              title
              body
            }
          }
        `,
        variables: {
          post,
        },
      })
      .pipe(map((res: any) => res.data?.createPost));
  }

  update(post: Post): Observable<Post> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation updatePost($id: ID!, $input: UpdatePostInput!) {
            updatePost(id: $id, input: $input) {
              id
              title
              body
            }
          }
        `,
        variables: {
          id: post.id,
          input: { body: post.body, title: post.title },
        },
      })
      .pipe(map((res: any) => res.data?.updatePost));
  }

  delete(id: string): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation deletePost($id: ID!) {
            deletePost(id: $id)
          }
        `,
        variables: {
          id,
        },
      })
      .pipe(map((res: any) => res.data?.deletePost));
  }
}
