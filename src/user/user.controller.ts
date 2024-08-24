import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
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
  postCreateUserAndProfile(@Body() profileData: { email?: string; profileImg?: string }) {
    return this.usersService.createUserAndProfile(profileData);
  }
  @Delete('profile/:id')
  deleteProfile(@Param('id') id: string) {
    return this.usersService.deleteProfile(id);
  }
  // @Post('post')
  // async postCreateUserAndPosts() {
  //   return this.usersService.createUserAndPosts();
  // }
  @Post('sample')
  async postSample() {
    return this.usersService.sample();
  }
}
