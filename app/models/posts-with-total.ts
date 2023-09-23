import { Post } from "./post";

export interface PostsWithTotal {
    posts: Post[];
    total: number;
}