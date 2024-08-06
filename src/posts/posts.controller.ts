import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
/*
 * author:string;
 * title:string;
 * content:string;
 * likeCount:number;
 * commentCount:number;
 */

type PostModel = {
  id: number; author: string; title: string; content: string; likeCount: number; commentCount: number;
};
let posts: PostModel[] = [ {
  id:1,
  author:'DummyAuthor',
  title:'DummyTitle',
  content:'DummyContent',
  likeCount:0,
  commentCount:0,
}, {
  id:2,
  author:'DummyAuthor2',
  title:'DummyTitle2',
  content:'DummyContent2',
  likeCount:1,
  commentCount:1,
},
  {
    id:3,
    author:'DummyAuthor3',
    title:'DummyTitle3',
    content:'DummyContent3',
    likeCount:2,
    commentCount:2,
  },
];

@Controller('posts')
export class PostsController {
  constructor (private readonly postsService: PostsService) {
  }
  
  // Get /posts
  @Get()
  getPosts(){
    return posts;
  }
  // Get /posts/:id
  
  // POST /posts
  // PUT /posts/:id
  // DELETE /popts/:id
}
