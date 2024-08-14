import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
@Entity()
export class UserModel {
  // ID
  // @PrimaryColumn
  // @PrimaryGeneratedColumn
  // @PrimaryGeneratedColumn('uuid') uuid : 고유값
  @PrimaryGeneratedColumn()
  id: number;
  // title
  @Column()
  title: string;

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
}
