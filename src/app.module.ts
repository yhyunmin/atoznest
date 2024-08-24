import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { UserModule } from './user/user.module';

import { PostsModule } from './posts/posts.module';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      // database: 'postgres',
      database: 'typeorm',
      synchronize: true,
      entities: [
        UserModel,
        ProfileModel,
        PostModel,
        TagModel,
        UsersModel,

        // PostsModel
      ],
    }),
    UserModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
