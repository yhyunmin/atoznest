import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*
 * author:string;
 * title:string;
 * content:string;
 * likeCount:number;
 * commentCount:number;
 */

type Post = {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
};
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getPost(): Post {
    return {
      author: 'newJeans_official',
      title: '제목입니다.',
      content: '내용입니다.',
      likeCount: 0,
      commentCount: 0,
    };
  }
}
