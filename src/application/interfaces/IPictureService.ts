import { Picture } from '../../domain/entities/Picture';

export interface IPictureService {
  getPictures(): Promise<Picture[]>;
}
