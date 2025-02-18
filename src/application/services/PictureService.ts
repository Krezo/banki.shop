import { Picture } from '@/domain/entities/Picture';
import { IPictureService } from '@/application/interfaces/IPictureService';
import { IPictureRepository } from '@/domain/repository/PictureRepository';

export class PictureService implements IPictureService {
  constructor(private readonly PictureRepository: IPictureRepository) {}

  async getPictures(): Promise<Picture[]> {
    return this.PictureRepository.getAll();
  }
}
