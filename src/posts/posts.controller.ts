import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
		return null;
	}

	// POST /posts
	@Post() postPost(@Body('authorId') authorId: number, @Body('title') title: string, @Body('content') content: string) {
		return this.postsService.createPost(authorId, title, content);
	}

	// PUT /posts/:id
	@Put(':id') putPost(@Param('id') id: string, @Body('title') title?: string) {
		return this.postsService.updatePost(+id, title);
	}

	// DELETE /popts/:id
	@Delete(':id')
	deletePost(@Param('id') id: string) {
		return this.postsService.deletePost(+id);
	}
	//
	// @Get('tags')
	// getTags() {
	// 	return this.postsService.getTags();
	// }
	//
	// @Post('tags')
	// createPostsTags() {
	// 	return this.postsService.createPostsTags();
	// }
}
