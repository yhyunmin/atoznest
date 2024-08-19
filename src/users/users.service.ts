import { Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../entity/user.entity';
import { ProfileModel } from '../entity/profile.entity';
import { PostModel } from '../entity/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private readonly usersRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel) private readonly profilesRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel) private readonly postsRepository: Repository<PostModel>,
  ) {}

  @Get() getUsers() {
    return this.usersRepository.find({
      // relations: { profile: true },
      relations: ['profile', 'posts'],
    });
  }

  @Post() postUsers() {
    return this.usersRepository.save({});
  }

  @Patch(':id')
  async patchUser(@Param('id') id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return this.usersRepository.save({
      ...user,
    });
  }

  @Post()
  async createUserAndProfile(profileData: { email?: string; profileImg?: string }) {
    const user = await this.usersRepository.save({
      email: 'asdf@asdf.asdf' || profileData.email,
    });
    const profile = await this.profilesRepository.save({
      profileImg: 'asdf.jpg' || profileData.profileImg,
      user,
    });
    return { user, profile };
  }

  @Post()
  async createUserAndPosts() {
    const user = await this.usersRepository.save({
      email: 'test@test.kr',
    });
    await this.postsRepository.save({
      author: user,
      title: 'post1',
    });
    await this.postsRepository.save({
      author: user,
      title: 'post2',
    });
    return user;
  }
}
