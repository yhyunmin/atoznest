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

  updatePost(postId: number, author?: string, title?: string, content?: string) {
    const post = posts.find(post => post.id === postId);
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
  deletePost(postId: number) {
    // id값이 다른거만 새로 posts 에 등록 ( id는 삭제 )
    const post = posts.find(post => post.id === +postId);
    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter(post => post.id !== +postId);
    return postId;
  }
}
