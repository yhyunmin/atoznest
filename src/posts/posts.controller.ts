import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
/*
 * author:string;
 * title:string;
 * content:string;
 * likeCount:number;
 * commentCount:number;
 */

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get /posts
  @Get() getPosts() {
    return this.postsService.getAllPosts();
  }

  // Get /posts/:id
  @Get(':id') // 다중 파라미터를 명시하기위해 param의 파라미터를 넣어준다.
  getPost(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  // POST /posts
  @Post() postPost(@Body('author') author: string, @Body('title') title: string, @Body('content') content: string) {
    this.postsService.createPost(author, title, content);
  }

  // PUT /posts/:id
  @Put(':id') putPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postsService.updatePost(+id, author, title, content);
  }

  // DELETE /popts/:id
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
