import { Picture } from '../../domain/entities/Picture';
import { PictureFactory } from '../../domain/factory/PictureFactory';
import { IPictureRepository } from '../../domain/repository/PictureRepository';
import { fakeFetch } from '../../shared/utils/utils';

import Image1 from '@/presentation/assets/images/pictures/pic_1.png';



export class PictureRepository implements IPictureRepository {
  private pictures: Picture[] = PictureFactory.createMany([
    {
      id: '1',
      title: `«Рождение Венеры» Сандро Боттичелли`,
      price: 1000000,
      oldPrice: 2000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: false,
    },
    {
      id: '2',
      title: `«Тайная вечеря»  Леонардо да Винчи`,
      price: 1000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: false,
    },
    {
      id: '3',
      title: `«Сотворение Адама»
Микеланджело`,
      price: 1000000,
      oldPrice: 2000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: false,
    },
    {
      id: '4',
      title: `«Урок анатомии»  Рембрандт`,
      price: 1000000,
      oldPrice: 2000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: true,
    },
  ]);

  async getAll(): Promise<Picture[]> {
    return fakeFetch([...this.pictures]);
  }

  async findByTitle(title: string): Promise<Picture[]> {
    return this.pictures.filter((p) => p.title.toLowerCase().includes(title.toLowerCase()));
  }
}