import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from '../users/entities/users.entity';
import { HASH_ROUNDS, JWT_SECRET } from './const/auth.const';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

/*
 *  AUTH 기능
 * 1) registerWithEmail
 * - email, nickname,password 입력 → 생성
 * - 생성 후, accessToken,refreshToken을 반환
 * - ㄴ> 회원가입 후 다시 로그인해주세요 <- 리다이렉트 방지
 *
 * 2) loginWithEmail
 * - email,password를 입력하면 사용자 검증을 진행.
 * - 검증 완료 후 aceessToken,refreshToken 반환
 *
 * 3) loginUser
 * - 1)과2)에서 필요한 accessToken 과 refreshToken을 반환하는 로직
 *
 * 4) signToken
 * - 3)에서 필요한 accessToken과 refreshToeken을 sign 하는 로직
 *
 * 5) authenticateWithEmailAndPassword
 * - 2)에서 로그인을 진행할 때 필요한 기본적인 검증 진행
 * - 1. 사용자가 존재하는지 확인(email기반)
 * - 2. 비밀번호가 맞는지 확인
 * - 3. 모두 통과되면 찾은 사용자 정보 반환
 * - 4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
 *
 * */
@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}
	/*
	 * Payload에 들어갈 정보
	 * 1) email (선택사항)
	 * 2) sub -> id
	 * 3) type -> 'access' | 'refresh'
	 * */

	// 유저 기반으로 토큰화
	signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) {
		const payLoad = {
			email: user.email,
			sub: user.id,
			type: isRefreshToken ? 'refresh ' : 'access',
		};
		return this.jwtService.sign(payLoad, {
			secret: JWT_SECRET, // 시크릿 키
			expiresIn: isRefreshToken ? 3600 : 300, // 만료시간 (Seconds)
		}); // JWT토큰화
	}
	// login 함수
	async loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
		return {
			accessToken: this.signToken(user, false),
			refreshToken: this.signToken(user, true),
		};
	}
	async authenticateWithEmailAndPassword(user: Pick<UsersModel, 'email' | 'password'>) {
		// 사용자가 있는지 확인
		const existingUser = await this.usersService.getUserByEmail(user.email);
		if (!existingUser) {
			throw new UnauthorizedException('존재하지 않는 사용자입니다.');
		}
		/*
		 * 1) 입력된 비밀번호
		 * 2) 기존 hash -> 사용자 정보에 저장되어있는 hash
		 * bcrypt가 알아서 비교함
		 * */
		const passOkay = bcrypt.compare(existingUser.password, user.password);
		if (!passOkay) {
			throw new UnauthorizedException('비밀번호가 틀렸습니다.');
		}

		return existingUser;
	}

	async loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>) {
		const existingUser = await this.authenticateWithEmailAndPassword(user);
		return this.loginUser(existingUser);
	}
	async registerWithEmail(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
		// 입력받은 비밀번호 해쉬화
		const hash = await bcrypt.hash(user.password, HASH_ROUNDS);
		const newUser = await this.usersService.createUser(user);
		return this.loginUser(newUser);
	}
}
