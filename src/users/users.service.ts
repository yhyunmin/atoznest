import { BadRequestException, Injectable } from '@nestjs/common';
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

	async createUser(userData: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
		// 닉네임 중복이 없는지 확인
		//
		const nickNameExists = await this.usersRepository.exists({
			where: {
				nickname: userData.nickname,
			},
		});
		if (nickNameExists) {
			throw new BadRequestException('이미 존재하는 닉네임 입니다.');
		}
		const emailExists = await this.usersRepository.exists({
			where: {
				email: userData.email,
			},
		});
		if (emailExists) {
			throw new BadRequestException('이미 존재하는 이메일 입니다.');
		}
		const user = this.usersRepository.create({
			nickname: userData.nickname, // 검증
			email: userData.email, // 검증
			password: userData.password, // 암호화
		});
		const newUser = await this.usersRepository.save(user);
		return newUser;
	}

	async getAllUsers() {
		return this.usersRepository.find();
	}

	//auth
	async getUserByEmail(email: string) {
		return this.usersRepository.findOne({
			where: { email },
		});
	}
}
