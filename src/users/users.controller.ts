import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getAllUsers();
	}
	@Post()
	postUser(@Body('nickname') nickname: string, @Body('email') email: string, @Body('password') password: string) {
		//  (08.25) 추후 body 를 클래스로 validate 하는 과정이있음
		return this.usersService.createUser(nickname, email, password);
	}
}
