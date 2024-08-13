// class 를 테이블로 변환하게함
// 1. 데코레이터 @Entity사용
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostsModel {
  @PrimaryGeneratedColumn() // 프로퍼티를 Column 으로 만듬 PrimaryColumn
  id: number;
  @Column()
  author: string;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  likeCount: number;
  @Column()
  commentCount: number;
}
