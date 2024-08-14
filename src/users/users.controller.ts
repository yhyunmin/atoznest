import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() getUsers() {
    return this.usersService.getUsers();
  }
  @Post() postUsers() {
    return this.usersService.postUsers();
  }
  @Patch(':id') patchUsers(@Param('id') id: string) {
    return this.usersService.patchUser(id);
  }
}
