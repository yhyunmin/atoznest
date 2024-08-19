import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() getUsers() {
    return this.usersService.getUsers();
  }
  @Post()
  postUsers() {
    return this.usersService.postUsers();
  }
  @Patch(':id') patchUsers(@Body('id') id: string) {
    return this.usersService.patchUser(id);
  }
  @Post('profile')
  async postCreateUserAndProfile(@Body() profileData: { email?: string; profileImg?: string }) {
    return this.usersService.createUserAndProfile(profileData);
  }
  @Post('post')
  async postCreateUserAndPosts() {
    return this.usersService.createUserAndPosts();
  }
}
