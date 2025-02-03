import { Cart } from '../entities/Cart';

export interface ICartRepository {
  save(cart: Cart): Promise<void>;
  get(): Promise<Cart>;
}
