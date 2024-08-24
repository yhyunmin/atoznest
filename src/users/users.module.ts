import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // entity 호출
  imports: [TypeOrmModule.forFeature([UsersModule])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
