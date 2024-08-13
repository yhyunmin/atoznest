import { Module, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entitiy';

@Module({
  imports: [
    // 레포지터리를 주입할땐 forFeature,연결을 설정할땐 forRoot
    TypeOrmModule.forFeature([
      // 불러오고싶은 모델을 넣으면되ㅣㄴ다.
      PostsModel,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService], // instance 를 넣은게 아닌, class 를 직접 넣었음.why ? 클래스를 인스턴스화 하는게아닌 IoC 컨테이너가 자동으로 인스턴스화 하고 관리하는걸 원해서, 관리를 원하는 클래스명을 작성
  // 주입을 해야하는 클래스들(db,typeorm 등)이 있다면, 전부 providers 에 넣음
})
export class PostsModule {}
