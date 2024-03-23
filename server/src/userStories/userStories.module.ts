import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStory } from './entities/userStory.entity';
import { UserStoriesService } from './userStories.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStory])],
  providers: [UserStoriesService],
  exports: [UserStoriesService],
})
export class UserStoriesModule {}
