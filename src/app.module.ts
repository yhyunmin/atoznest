import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 0804) 컨트롤러,서비스를 포함한 다른 프로바이더들을 사용함(의존성 관리)
