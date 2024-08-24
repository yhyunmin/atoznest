import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../entity/user.entity';
import { ProfileModel } from '../entity/profile.entity';
import { PostModel } from '../entity/post.entity';
import { TagModel } from '../entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel, TagModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
