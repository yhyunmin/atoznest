import { Injectable } from '@nestjs/common';

// ctrlr,service,module은 한 세트다.
// service 와 컨트롤러의 차이 :
// 로직과 관련된 정의는 service , controller 에서 불러와서 사용

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}
}
