import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../entity/user.entity';
import { ProfileModel } from '../entity/profile.entity';
import { PostModel } from '../entity/post.entity';
import { TagModel } from '../entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel, TagModel])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
