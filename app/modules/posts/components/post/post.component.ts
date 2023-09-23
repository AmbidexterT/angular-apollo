import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { StateStore } from '@models/state-store';
import { Post } from '@models/post';
import { Store } from '@ngrx/store';
import { PostsActions } from '../../store/post.actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnChanges {
  @Input() post!: Post;

  isEditing: boolean = false;
  body: string = '';
  title: string = '';

  constructor(private store: Store<StateStore>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.body = changes['post'].currentValue.body;
      this.title = changes['post'].currentValue.title;
    }
  }

  edit() {
    this.isEditing = true;
  }

  deletePost() {
    this.store.dispatch(PostsActions.deletePost({ id: this.post.id! }));
  }

  updatePost() {
    if (!this.body || !this.title) {
      return;
    }

    const post: Post = {
      id: this.post.id,
      body: this.body,
      title: this.title,
    };

    this.store.dispatch(PostsActions.updatePost({ post }));

    this.isEditing = false;
  }

  cancel() {
    this.isEditing = false;
  }
}
