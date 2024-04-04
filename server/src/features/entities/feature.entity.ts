import { Project } from 'src/projects/entities/project.entity';
import { UserStory } from 'src/userStories/entities/userStory.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  // foreign key: many features => one project
  @ManyToOne(() => Project, (project) => project.features, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  // one feature => many userStories
  @OneToMany(() => UserStory, (userStory) => userStory.feature)
  userStories: UserStory[];
}
