//Table inheritance

import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
// 1) 상속받은 클래스들이 각각 개별의 테이블을 생성하는 Inheritance

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: number;
  @UpdateDateColumn()
  updatedAt: number;
}

@Entity()
export class Book extends BaseModel {
  @Column()
  name: string;
}
@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}
// 2) Single Table Inheritance : 생기는 형태는 하나의 테이블로 모든엔티티들이 관리되는 법

@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class singleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: number;
  @UpdateDateColumn()
  updatedAt: number;
}

@ChildEntity()
export class ComputerModel extends singleBaseModel {
  @Column()
  brand: string;
}
@ChildEntity()
export class AirplaneModel extends singleBaseModel {
  @Column()
  country: string;
}
