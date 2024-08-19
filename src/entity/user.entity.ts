import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

// enum 칼럼
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity()
export class UserModel {
  // ID
  // @PrimaryColumn
  // @PrimaryGeneratedColumn
  // @PrimaryGeneratedColumn('uuid') uuid : 고유값
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  // title
  // @Column({
  //   type: 'varchar', // 기본으로는 테이블 칼럼 타입을 적어줘야한다
  //   name: '_title', // title의 프로퍼티의 이름을 지정한다.
  //   length: 300, // 값의 길이(입력할 수 있는 길이)
  //   nullable: true, // t/f : null값 입력 허용 유무
  //   update: false, // true 면 처음 저장할때만 값 지정 가능 수정불가능
  //   //기본값이 true : find(),findOne()를(get요청) 할때 json에 기본으로 값을 불러올지 유무
  //   select: true,
  //   // 아무것도 입력 안했을때 생성시 기본으로 입력되는 값.
  //   default: 'default value',
  //   // 칼럼에서 유일한 값 (회원가입할때 이메일에 보통 사용 )
  //   unique: false,
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
  // dater created date
  // @CreateDateColumn() : 데이터가 생성되는 날짜와 시간이 "자동으로" 찍힌다.
  @CreateDateColumn()
  createAt: Date;
  // dater updated date
  // @UpdateDateColumn() : 데이터가 업데이트 되는 날짜와 시간이 "자동으로" 찍힌다
  @UpdateDateColumn()
  updateAt: Date;
  // @VersionColumn() : 데이터가 업데이트될때마다 1씩 "자동으로" 올라간다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  @Column()
  @Generated('uuid') //increment 1씩 올라감 uuid : 고유값 항상 colum 어노테이션과 사용해야 함.
  //"자동으로" 생성됨
  additionalId: string;
  @OneToOne(() => ProfileModel, profile => profile.user)
  profile: ProfileModel;

  @OneToMany(() => PostModel, post => post.author)
  posts: PostModel[];
}
