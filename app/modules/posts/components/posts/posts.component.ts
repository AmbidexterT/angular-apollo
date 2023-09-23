import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';

import { PageQueryOptions } from '@models/page-query-options';
import { Post } from '@models/post';
import { Store, select } from '@ngrx/store';
import {
  isLoadingSelector,
  postsSelector,
  postsErrorSelector,
  totalPosts,
} from '../../store/post.selectors';

import { StateStore } from '@models/state-store';
import { PostsActions } from '../../store/post.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../modal/create-post/create-post.component';
import { PaginateOptions } from '@models/paginate-options';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private readonly searchSubject = new Subject<string | undefined>();
  posts$!: Observable<Post[]>;
  loading!: boolean;
  error$!: Observable<string | null>;
  destroyed$ = new ReplaySubject(1);

  paginate: PaginateOptions = {
    page: 1,
    limit: 10,
  };

  totalCount: number = 0;
  editingId: number | undefined;

  constructor(
    private store: Store<StateStore>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      PostsActions.loadPosts({ options: { paginate: this.paginate } })
    );

    this.posts$ = this.store.pipe(select(postsSelector));
    this.error$ = this.store.pipe(select(postsErrorSelector));

    this.store
      .pipe(select(totalPosts), takeUntil(this.destroyed$))
      .subscribe((totalPosts) => (this.totalCount = totalPosts));

    this.store
      .pipe(select(isLoadingSelector), takeUntil(this.destroyed$))
      .subscribe((isLoading) => (this.loading = isLoading));

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchQuery) => {
          if (searchQuery) {
            return of(
              this.store.dispatch(
                PostsActions.loadPostFromSearch({ search: searchQuery })
              )
            );
          } else {
            this.paginate = this.getInitPaginate();
            const options = {
              paginate: this.paginate,
            };

            return of(
              this.store.dispatch(
                PostsActions.loadPosts({
                  options,
                })
              )
            );
          }
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  createPosts() {
    this.dialog.open(CreatePostComponent, {
      width: '850px',
    });
  }

  onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery);
  }

  loadMore() {
    const canLoadMore =
      this.paginate!.limit * this.paginate!.page < this.totalCount;

    if (canLoadMore) {
      this.paginate = {
        ...this.paginate,
        page: this.paginate!.page + 1,
        limit: 10,
      };

      const options: PageQueryOptions = {
        paginate: this.paginate,
      };

      this.store.dispatch(PostsActions.loadPosts({ options }));
    }
  }

  getInitPaginate(): PaginateOptions {
    return {
      page: 1,
      limit: 10,
    };
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.loading) {
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      const documentHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      const scrolledToBottom = scrollPosition + windowHeight >= documentHeight;

      if (scrolledToBottom) {
        this.loadMore();
      }
    }
  }
}
