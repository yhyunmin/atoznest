// class 를 테이블로 변환하게함
// 1. 데코레이터 @Entity사용
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersModel } from '../../users/entities/users.entity';

@Entity()
export class PostsModel {
	@PrimaryGeneratedColumn() // 프로퍼티를 Column 으로 만듬 PrimaryColumn
	id: number;
	// 1) UsersModel과 연동한다 Foreign Key
	// 2) null이 될 수 없다
	// @Column()
	// author: string;
	@ManyToOne(() => UsersModel, user => user.posts, { nullable: false }) author: UsersModel;
	@Column() title: string;
	@Column() content: string;
	@Column() likeCount: number;
	@Column() commentCount: number;
}
