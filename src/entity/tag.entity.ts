import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostModel } from './post.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class TagModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PostModel, post => post.tags)
  // @JoinTable()
  posts: PostModel[];
  @Column()
  name: string;
}
