import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getUserStoryTasks(id: number) {
    return this.tasksRepository.find({ where: { userStory: { id } } });
  }

  async createTask(name: string, userStoryId: number) {
    await this.tasksRepository.save({
      name,
      userStory: {
        id: userStoryId,
      },
    });
    return await this.getUserStoryTasks(userStoryId);
  }

  async updateTask(
    field: string,
    value: string,
    userId: number,
    taskId: number,
  ) {
    const taskToUpdate = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        // Navigate through the various entity relationships defined in the database schema
        userStory: { feature: { project: { user: { id: userId } } } },
      },
      relations: ['userStory'],
    });

    if (taskToUpdate) {
      taskToUpdate[field] = value;
      await this.tasksRepository.save(taskToUpdate);
      return taskToUpdate.userStory.id;
    } else {
      throw new BadRequestException('You cannot edit that task');
    }
  }
}
