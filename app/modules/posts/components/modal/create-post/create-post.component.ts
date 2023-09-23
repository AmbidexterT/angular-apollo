import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { createPostError, createPostSuccess, PostsActions } from '../../../store/post.actions';
import { StateStore } from '@models/state-store';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  postForm: FormGroup = this.fb.group({
    body: ['', Validators.required],
    title: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private store: Store<StateStore>,
    private actions$: Actions,
  ) {}

  onSave() {
    if (this.postForm.valid) {
      this.store.dispatch(
        PostsActions.createPost({ post: this.postForm.value })
      );

      this.actions$.pipe(
        ofType(createPostSuccess, createPostError)
      ).subscribe(action => {
        if (action.type === createPostSuccess.type) {
          this.dialogRef.close();
        } else if (action.type === createPostError.type) {
          console.error('Error while saving post:', action.error);
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
