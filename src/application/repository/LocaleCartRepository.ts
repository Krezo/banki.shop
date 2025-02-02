import { Cart } from '../../domain/entities/Cart';
import { ICartRepository } from '../../domain/repository/CartRepository';
import { CartItem } from '../../domain/entities/CartItem';

export class LocaleCartRepository implements ICartRepository {
  private static readonly CART_KEY = '__cart_localstorage_key';
  private _instance: Cart | null = null;

  async save(cart: Cart): Promise<void> {
    const serializedCart = {
      id: cart.id,
      items: cart.items
    };
    localStorage.setItem(LocaleCartRepository.CART_KEY, JSON.stringify(serializedCart));
  }

  async get(): Promise<Cart> {

    if (this._instance) {
      return this._instance;
    }

    const cartData = localStorage.getItem(LocaleCartRepository.CART_KEY);

    if (!cartData) {
      this._instance = new Cart();
      return new Cart();
    }

    const parsedData = JSON.parse(cartData);
    this._instance = new Cart(parsedData.id, parsedData.items);


    return this._instance;
  }
}