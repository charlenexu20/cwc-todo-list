import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStory } from './entities/userStory.entity';

@Injectable()
export class UserStoriesService {
  constructor(
    @InjectRepository(UserStory)
    private userStoriesRepository: Repository<UserStory>,
  ) {}

  async getFeatureUserStories(id: number) {
    return this.userStoriesRepository.find({ where: { feature: { id } } });
  }

  async createUserStory(name: string, description: string, featureId: number) {
    await this.userStoriesRepository.save({
      name,
      description,
      feature: {
        id: featureId,
      },
    });
    return await this.getFeatureUserStories(featureId);
  }

  async getUserStoryStatusById(id: number) {
    const userStory = await this.userStoriesRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    const tasks = userStory.tasks;
    const taskCount = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Done');
    const completedTasksLength = completedTasks.length;

    return `${completedTasksLength}/${taskCount}`;
  }

  async getUserStoryById(id: number) {
    return await this.userStoriesRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async updateUserStory(
    field: string,
    value: string,
    userId: number,
    userStoryId: number,
  ) {
    const storyToUpdate = await this.userStoriesRepository.findOne({
      where: {
        id: userStoryId,
        // Navigate through the various entity relationships defined in the database schema
        feature: { project: { user: { id: userId } } },
      },
      relations: ['feature', 'feature.project'],
    });

    if (storyToUpdate) {
      storyToUpdate[field] = value;
      const updatedStory = await this.userStoriesRepository.save(storyToUpdate);
      return updatedStory.feature.project.id;
    } else {
      throw new BadRequestException('You cannot edit that task');
    }
  }
}
