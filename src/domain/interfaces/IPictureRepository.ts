import { Picture } from '../entities/Picture';

export interface IPictureRepository {
  getAll(): Promise<Picture[]>;
  findByTitle(title: string): Promise<Picture[]>;
}
