import { Cart } from '../../domain/entities/Cart';
import { CartItemType } from '../../domain/interfaces/ICartItem';
import { ICartRepository } from '../../domain/repository/CartRepository';
import { fakeFetch } from '../../shared/utils/utils';

export class CartService {
  constructor(private cartRepository: ICartRepository) { }

  async addToCart(item: CartItemType, quantity: number = 1): Promise<void> {
    await fakeFetch({}, 1000)
    const cart = await this.cartRepository.get();
    cart.addItem(item, quantity);
    await this.cartRepository.save(cart);
  }

  async removeFromCart(item: CartItemType): Promise<void> {
    await fakeFetch({}, 1000)
    const cart = await this.cartRepository.get();
    cart.deleteItem(item);
    await this.cartRepository.save(cart);
  }

  async getCart(): Promise<Cart> {
    await fakeFetch({}, 1000)
    return this.cartRepository.get();
  }
}