import { Feature } from 'src/features/entities/feature.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserStory {
  @PrimaryGeneratedColumn()
  id: number;

  // foreign key: many userStories => one feature
  @ManyToOne(() => Feature, (feature) => feature.userStories)
  feature: Feature;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  // one userStory => many tasks
  @OneToMany(() => Task, (task) => task.userStory)
  tasks: Task[];
}
