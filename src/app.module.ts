import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entitiy';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // 데이터베이스 타입 등록한 postgres 기본정보 입력
      type: 'postgres',
      host: '127.0.0.1',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // 생성 모델, 데이터베이스와 연동될 모델
      entities: [
        //만든 entities 를 등록
        PostsModel,
      ], //entities : 모델을 지칭하는 단어
      //typeOrm 코드와 db의 싱크를 자동으로 맞추기 유무 개발환경에선 true, 프로덕션에선 false
      synchronize: true,
    }),
  ], // 다른 모듈을 불러올 때 사용, CLI 로 생성 시 자동 추가. // TypeOrmModule 추가
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
