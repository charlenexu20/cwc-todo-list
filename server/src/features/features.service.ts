import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
  ) {}

  async getProjectFeatures(id: number) {
    return this.featuresRepository.find({
      where: { project: { id } },
      relations: ['userStories'],
    });
  }

  async createFeature(name: string, description: string, projectId: number) {
    await this.featuresRepository.save({
      name,
      description,
      project: {
        id: projectId,
      },
    });
    return await this.getProjectFeatures(projectId);
  }

  async updateFeature(
    field: string,
    value: string,
    userId: number,
    featureId: number,
  ) {
    const featureToUpdate = await this.featuresRepository.findOne({
      where: {
        id: featureId,
        // Navigate through the various entity relationships defined in the database schema
        project: { user: { id: userId } },
      },
      relations: ['project'],
    });

    if (featureToUpdate) {
      featureToUpdate[field] = value;
      const updatedFeature =
        await this.featuresRepository.save(featureToUpdate);
      return updatedFeature.project.id;
    } else {
      throw new BadRequestException('You cannot edit this feature');
    }
  }

  async deleteFeature(featureId: number, userId: number) {
    const featureToDelete = await this.featuresRepository.findOne({
      where: {
        id: featureId,
        project: { user: { id: userId } },
      },
      relations: ['project'],
    });

    if (featureToDelete) {
      await this.featuresRepository.delete(featureToDelete);
      return featureToDelete.project.id;
    } else {
      throw new BadRequestException('You cannot delete that feature');
    }
  }
}
