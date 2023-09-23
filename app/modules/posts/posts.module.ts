import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { PostsService } from 'src/app/services/posts.service';
import { PostsRoutingModule } from './posts-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/post.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/post.effects';
import { CreatePostComponent } from './components/modal/create-post/create-post.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent, PostComponent, CreatePostComponent],
  imports: [
    SharedModule,
    PostsRoutingModule,
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostsEffects]),
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [PostsService],
})
export class PostsModule {}
