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
	 * 토큰을 사용하게 되는 방식
	 *
	 * 1) 사용자가 로그인 또는 회원가입을 진행하면 accessToken과 refreshToken을 발급받는다.
	 * 2) 로그인 할때는 Basic 토큰과 함꼐 요청을 보낸다. ( header 에 basic 토큰과함께 보내야함)
	 *  basic 토큰은 '이메일:비밀번호'를 Base64로 인코딩한 형태이다.
	 * 예) {authorization:'Basic {token}'} (계정정보)
	 * 3) 아무나 접근 할 수 없는 정보( private route )를 접근 할 때는 accessToken을 header에 추가해서 요청과 함께 보낸다.
	 * 예 ) {authorization :'Bearer {token}'} (발급받은 JWT 토큰)
	 * 4) 토큰과 요청을 함께 받은 서버는 토큰 검증을 통해 현재 요청을 보낸 사용자가 누구인지 알 수 있다.
	 * 예 ) 현재 로그인한 사용자가 작성한 포스트만 가져오려면 토큰의 sub 값에 입력되어있는 사용자의 포스트만 따로 필터링 할 수 있다.
	 * 특정 사용자의 토큰이 없다면 다른 사용자의 데이터를 접근 못한다.
	 * 5) 모든 토큰은 만료 기간이 있다. 만료기간이 지나면 새로 토큰을 발급받아야한다.
	 * 그렇지 않다면 jwtService.verify() 에서 인증이 통과 안된다.
	 * 그러니 access 토큰을 새로 발급받을 수있는 /auth/token/access 와
	 * refresh 토큰을 새로 발급 받을 수 있는 /auth/token/refresh가 필요하다
	 * 6)토큰이 만료되면 각각의 토큰을 새로 발급 받을 수 있는 엔드포인트에 요청을 해서
	 * 새로운 토큰을 발급받고 새로운 토큰을 사용해서 private route에 접근 한다.
	 * */

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
		const passOkay = bcrypt.compare(user.password, existingUser.password);
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
		const newUser = await this.usersService.createUser({
			...user,
			password: hash,
		});
		return this.loginUser(newUser);
	}
}
