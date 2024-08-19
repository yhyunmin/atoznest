import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from './user.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => UserModel, user => user.profile)
  user: UserModel;
  @Column()
  profileImg: string;
}
