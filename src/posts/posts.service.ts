import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entitiy';
import { InjectRepository } from '@nestjs/typeorm';

export type PostModel = {
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

@Injectable() // 프로바이더로 사용할수있는 어노테이션
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  async getAllPosts() {
    return this.postsRepository.find();
  }
  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  async createPost(author: string, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드로 생성한 객체로)

    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    return await this.postsRepository.save(post);
  }

  async updatePost(postId: number, author?: string, title?: string, content?: string) {
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
    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
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
}
