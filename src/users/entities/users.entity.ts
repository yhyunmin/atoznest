import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 20,
    unique: true,
  })
  // 1) 길이가 20을 넘지 않을 것
  // 2) 유일무이한 값이 될 것 (중복 X)
  nickname: string;
  @Column({
    unique: true,
  })
  // 1) 중복 X
  email: string;
  @Column()
  password: string;
  // @Column()
  // role: [RolesEnum.USER, RolesEnum.Admin];
  @Column({
    enum: Object.values(RolesEnum), // enum값의 value들을 사용할 것이다 지정
    default: RolesEnum.USER, //role 의 기본값
  })
  role: RolesEnum;
}
