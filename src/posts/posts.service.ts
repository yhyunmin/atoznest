import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Injectable() // 프로바이더로 사용할수있는 어노테이션
export class PostsService {
	constructor(
		@InjectRepository(PostsModel)
		private readonly postsRepository: Repository<PostsModel>,
		// @InjectRepository(PostsModel)
		// private readonly postsRepository: Repository<PostsModel>,
	) {}
	async getAllPosts() {
		return this.postsRepository.find({
			relations: ['author'], // author 붙은 usersModel 호출
		});
	}
	async getPostById(id: number) {
		const post = await this.postsRepository.findOne({
			where: {
				id,
			},
			relations: ['author'],
		});
		if (!post) {
			throw new NotFoundException();
		}
		return post;
	}
	async createPost(authorId: number, title: string, content: string) {
		// 1) create -> 저장할 객체를 생성한다.
		// 2) save -> 객체를 저장한다. (create 메서드로 생성한 객체로)
		const post = this.postsRepository.create({
			author: {
				id: authorId,
			},
			title,
			content,
			likeCount: 0,
			commentCount: 0,
		});
		await this.postsRepository.save(post);
		return post;
	}

	async updatePost(postId: number, title?: string) {
		// save의 기능
		// 1) 만약에 데이터가 존재하지 않는다면 ( id 기준) 새로 생성,
		// 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.

		// const post = posts.find(post => post.id === postId);

		const post = await this.postsRepository.findOne({
			where: {
				id: postId,
			},
		});
		if (!post) {
			throw new NotFoundException();
		}

		if (title) {
			post.title = title;
		}

		const newPost = await this.postsRepository.save(post);
		return newPost;
	}
	async deletePost(postId: number) {
		// id값이 다른거만 새로 posts 에 등록 ( id는 삭제 )
		// const post = posts.find(post => post.id === +postId);
		// if (!post) {
		//   throw new NotFoundException();
		// }
		// posts = posts.filter(post => post.id !== +postId);

		const post = await this.postsRepository.findOne({
			where: {
				id: postId,
			},
		});
		if (!post) {
			throw new NotFoundException();
		}
		await this.postsRepository.delete(postId);
		return postId;
	}
	//
	// async createPostsTags() {
	// 	const post1 = await this.postsRepository.save({
	// 		title: 'tag test1 nestJS',
	// 	});
	// 	const post2 = await this.postsRepository.save({
	// 		title: 'tag test2',
	// 	});
	// 	const tag1 = await this.tagsRepository.save({
	// 		name: 'tag 1 javascript',
	// 		posts: [post1, post2],
	// 	});
	// 	const tag2 = await this.tagsRepository.save({
	// 		name: 'tag 2 typescript',
	// 		posts: [post1],
	// 	});
	// 	const post3 = await this.postsRepository.save({
	// 		title: 'post 3',
	// 		tags: [tag1, tag2],
	// 	});
	// 	return true;
	// }
	// getTags() {
	// 	return this.tagsRepository.find({
	// 		relations: ['posts'],
	// 	});
	// }
}
