import { Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../entity/user.entitiy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly usersRepository: Repository<UserModel>,
  ) {}

  @Get()
  getUsers() {
    return this.usersRepository.find();
  }
  @Post()
  postUsers() {
    return this.usersRepository.save({ title: 'test title' });
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
      title: user.title + '0',
    });
  }
}
