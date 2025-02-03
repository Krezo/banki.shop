import { Picture } from '../entities/Picture';
import { v4 as uuidv4 } from 'uuid';

export interface PictureFactoryParams {
  id?: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  sold: boolean;
  oldPrice?: number;
}

export class PictureFactory {
  static create(params: PictureFactoryParams): Picture {
    this.validateParams(params);

    return new Picture(
      params.id || uuidv4(),
      params.title,
      params.description,
      params.price,
      params.images,
      params.sold,
      params.oldPrice
    );
  }

  static createMany(paramsArray: PictureFactoryParams[]): Picture[] {
    if (!Array.isArray(paramsArray)) {
      throw new Error('Parameters must be an array');
    }

    return paramsArray.map((params) => {
      return this.create(params);
    });
  }

  private static validateParams(params: PictureFactoryParams): void {
    if (!params.title) throw new Error('Title is required');
    if (!params.description) throw new Error('Description is required');
    if (!params.price || params.price <= 0) throw new Error('Invalid price');
    if (!params.images || params.images.length === 0) throw new Error('Images are required');
    if (params.oldPrice && params.oldPrice <= params.price) {
      throw new Error('Old price must be greater than current price');
    }
  }
}