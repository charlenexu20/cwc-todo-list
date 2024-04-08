import { UserStory } from 'src/userStories/entities/userStory.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  // foreign key: many tasks => one userStory
  @ManyToOne(() => UserStory, (userStory) => userStory.tasks, {
    // if a userstory is deleted, all related tasks should also be deleted.
    onDelete: 'CASCADE',
  })
  userStory: UserStory;

  @Column()
  name: string;

  @Column({ default: 'To Do' })
  status: string;
}
