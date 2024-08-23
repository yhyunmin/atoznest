import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { UserModel } from '../entity/user.entity';
import { ProfileModel } from '../entity/profile.entity';
import { PostModel } from '../entity/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private readonly usersRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel) private readonly profilesRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel) private readonly postsRepository: Repository<PostModel>,
  ) {}

  async sample() {
    // 모델에 해당되는 객체 생성 - DB에 저장은 안함
    const user1 = this.usersRepository.create({
      email: 'test@test.ai',
    });
    //db 저장
    const user2 = await this.usersRepository.save({
      email: 'test@test.ai',
    });
    // preload
    // 입력된 값을 기반으로 db 에 있는 데이터를 불러오고 추가 입력된 값으로 db에서 가져온 값을 대체함.
    const user3 = await this.usersRepository.preload({ id: 101, email: 'test@test.ai' }); // 101을 불러와서 email값으로 바꾼다
    // 삭제
    await this.usersRepository.delete(101);
    // 값 변경 : 증가
    await this.usersRepository.increment(
      {
        id: 1,
      },
      'count',
      2, // id 1번에게 count 를 2만크 증가시킨다.
    );
    await this.usersRepository.decrement(
      {
        id: 1,
      },
      'count',
      1, // id 1번에게 count 를 2만큼 감소시킨다.
    );
    // 갯수 카운팅하기
    await this.usersRepository.count({
      where: {
        email: ILike('%@%'),
      }, // @ 가 들어간 email 의 개수를 카운팅 함.
    });
    // sum :전부다 더함
    const sum = await this.usersRepository.sum('count', {
      email: ILike('%@%'), //@ 가 들어가는 모든 count의 값
    });
    // average : 평균
    const average = await this.usersRepository.average('count', {
      id: LessThanOrEqual(4), // id 기준으로 평균값을 구한다
    });

    // 최소값
    const min = await this.usersRepository.minimum('count', {
      id: LessThan(4),
    });
    // 최대값
    const max = await this.usersRepository.maximum('count', {
      id: LessThan(4),
    });

    // pagination 할때 사용할
    const usersAndCount = await this.usersRepository.findAndCount({ take: 3 }); // 3(뽑아온개수) / 결과값 100(총개수)

    return user2;
  }

  getUsers() {
    return this.usersRepository.find({
      where: {
        //id: Not(1), // 1이 아닌경우를 모두 가져옴
        // id: LessThan(30), // n보다 작은경우 가져오기
        // id: LessThanOrEqual(30), // 30과 같거나 작거나 다가져오기
        // id: MoreThan(30), //n보다 큰경우 가져오기
        // id: MoreThanOrEqual, // n보다 많거나 같은 경우
        // id: Equal(30), // 30과 같음
        //    유사값
        //email: Like('%google'), // %: google 앞에 어떤글자가 와도 상관이 없다는 뜻 * 대소문자 구분
        email: ILike('%google'), // 대소문자 구분함
        //    사이값
        // id: Between(10, 15), //10에서 15 사이 값
        // 해당되는 여러개의 값
        id: In([1, 3, 5, 7, 99]), // 해당되는 모든값들을 가져옴
        // id:IsNull(), : null 인경우 가져오기
      },

      // relations: { profile: true },
      // relations: ['profile', 'posts'], // 별성정 하지 않고 entity의 eager 옵션을통해 가져올수있다
      //
      // 어떤 프로퍼티를 선택할지 정의 빈값 : 기본값
      // select: {
      //   id: true,
      //   createAt: true,
      // },
      // 필터링할 조건을 입력하게된다
      // where: {
      //   id: 1,
      //   version: 1,
      // }, // and 조건
      // where: [{ id: 1 }, { version: 1 }], // or 조건
      // relations: {
      //   // 관계된 테이블 가져오기
      //   // 키:테이블 : 벨류 boolean or 객체
      //   profile: {
      //     // id: true,
      //   },
      // },
      // order: {
      //   //오름차순 내림차순
      //   id: 'ASC', // 오름차순
      //   // desc: 'DESC', // 내림차순
      // },
      // skip: 0, // 처음 몇개를 제외할지,
      // take: 0, // 원하는 갯수의 데이터만 가져올 수 있음, 0은 데이터를 전부 가져옴 ,
    });
  }

  async postUsers() {
    for (let i = 0; i < 100; i++) {
      await this.usersRepository.save({
        email: `user${i}@google.com`,
      });
    }
  }

  async patchUser(@Param('id') id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return this.usersRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  async createUserAndProfile(profileData: { email?: string; profileImg?: string }) {
    // cascade false 일경우 ;
    // const user = await this.usersRepository.save({
    //   email: 'asdf@asdf.asdf' || profileData.email,
    // });
    // const profile = await this.profilesRepository.save({
    //   profileImg: 'asdf.jpg' || profileData.profileImg,
    //   user,
    // });
    // return { user, profile };
    // cascade 옵션 true일 경우
    const data = await this.usersRepository.save({
      email: 'cascadeTest@createuserAndprofile.e' || profileData.email,
      profile: {
        profileImg: 'caseCadetrueImg.jpg' || profileData.profileImg,
      },
    });
    return { data };
  }

  async deleteProfile(@Param('id') id: string) {
    await this.profilesRepository.delete(+id);
  }

  async createUserAndPosts() {
    const user = await this.usersRepository.save({
      email: 'test@test.kr',
    });
    await this.postsRepository.save({
      author: user,
      title: 'post1',
    });
    await this.postsRepository.save({
      author: user,
      title: 'post2',
    });
    return user;
  }
}
