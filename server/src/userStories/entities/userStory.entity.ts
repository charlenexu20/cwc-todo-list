import { Feature } from 'src/features/entities/feature.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @Column({ default: 'To Do' })
  status: string;
}
