import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // root page '/' 와 같음
  getHome() {
    return 'Home Page';
  }
  @Get('post')
  getPost() {
    return 'Post Page';
  }
  @Get('user')
  getUser() {
    return 'User Page';
  }
}
