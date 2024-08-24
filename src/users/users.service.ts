import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';

// service = 로직 작성
@Injectable()
export class UsersService {
  constructor(
    //리포지토리 인젝트
    @InjectRepository(UsersModel) private readonly usersRepository: Repository<UsersModel>,
  ) {}
  async createUser(nickname: string, email: string, password: string) {
    const user = this.usersRepository.create({
      nickname, // 검증
      email, // 검증
      password, // 암호화
    });
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }
}
