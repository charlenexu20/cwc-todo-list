import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featuressRepository: Repository<Feature>,
  ) {}

  async getProjectFeatures(id: number) {
    return this.featuressRepository.find({ where: { project: { id } } });
  }

  async createFeature(name: string, description: string, projectId: number) {
    await this.featuressRepository.save({
      name,
      description,
      project: {
        id: projectId,
      },
    });
    return await this.getProjectFeatures(projectId);
  }
}
