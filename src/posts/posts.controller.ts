import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
/*
 * author:string;
 * title:string;
 * content:string;
 * likeCount:number;
 * commentCount:number;
 */

type PostModel = {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
};
let posts: PostModel[] = [
  {
    id: 1,
    author: 'DummyAuthor',
    title: 'DummyTitle',
    content: 'DummyContent',
    likeCount: 0,
    commentCount: 0,
  },
  {
    id: 2,
    author: 'DummyAuthor2',
    title: 'DummyTitle2',
    content: 'DummyContent2',
    likeCount: 1,
    commentCount: 1,
  },
  {
    id: 3,
    author: 'DummyAuthor3',
    title: 'DummyTitle3',
    content: 'DummyContent3',
    likeCount: 2,
    commentCount: 2,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get /posts
  @Get() getPosts() {
    return posts;
  }

  // Get /posts/:id
  @Get(':id') // 다중 파라미터를 명시하기위해 param의 파라미터를 넣어준다.
  getPost(@Param('id') id: string) {
    const post = posts.find(post => post.id === +id);
    if (!post) {
      throw new NotFoundException(); // notfoundException() = statuscode: 404 message:notfound를 던져줌
      // nest → docs-overview-built-in exception→ 에서 골라쓰면됨
    }
    return post;
  }

  // POST /posts
  @Post() postPost(@Body('author') author: string, @Body('title') title: string, @Body('content') content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };
    posts = [...posts, post];

    return post;
  }

  // PUT /posts/:id
  @Put(':id') putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    const post = posts.find(post => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }
    // 포스트리스트에 id 비교하여 수정된 값만 변경, 다른경우는 그대로
    // posts = posts.map(prev => (prev.id === +id ? post : prev));
    return post;
  }

  // DELETE /popts/:id
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    // id값이 다른거만 새로 posts 에 등록 ( id는 삭제 )
    const post = posts.find(post => post.id === +id);
    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter(post => post.id !== +id);
    return id;
  }
}
