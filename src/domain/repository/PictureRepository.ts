import { Picture } from '../entities/Picture';
import { IPictureRepository } from '../interfaces/IPictureRepository';
import Image1 from '@/presentation/assets/images/pictures/pic_1.png';

function fakeFetch<T>(data: T) {
  return new Promise<T>((res) => {
    setTimeout(() => res(data), Math.random() * 1000);
  });
}

export class PictureRepository implements IPictureRepository {
  private pictures: Picture[] = [
    {
      id: '1',
      title: `«Рождение Венеры» Сандро Боттичелли`,
      price: 1000000,
      oldPrice: 2000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: true,
    },
    {
      id: '2',
      title: `«Рождение Венеры» Сандро Боттичелли`,
      price: 1000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: true,
    },
    {
      id: '3',
      title: `«Рождение Венеры» Сандро Боттичелли`,
      price: 1000000,
      oldPrice: 2000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: true,
    },
    {
      id: '4',
      title: `«Рождение Венеры» Сандро Боттичелли`,
      price: 1000000,
      oldPrice: 2000000,
      images: [Image1, Image1, Image1, Image1],
      description: 'Description',
      sold: true,
    },
  ];

  async getAll(): Promise<Picture[]> {
    return fakeFetch([...this.pictures]);
  }
  async findByTitle(title: string): Promise<Picture[]> {
    return this.pictures.filter((p) => p.title.toLowerCase().includes(title.toLowerCase()));
  }
}
