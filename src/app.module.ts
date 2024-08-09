import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';

@Module({
  imports: [PostsModule], // 다른 모듈을 불러올 때 사용, CLI 로 생성 시 자동 추가.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
