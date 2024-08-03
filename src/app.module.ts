import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
