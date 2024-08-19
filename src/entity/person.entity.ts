import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Entity Embedding
export class Name {
  @Column()
  first: string;
  @Column()
  last: string;
}
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(() => Name)
  name: Name;
  @Column()
  class: string;
}

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(() => Name)
  name: Name;
  @Column()
  class: string;
  @Column()
  salary: string;
}
