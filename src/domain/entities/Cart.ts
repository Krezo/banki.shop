import { v4 as uuidv4 } from 'uuid';
import { CartItem } from './CartItem';
import { CartItemType } from '../interfaces/ICartItem';

export type CartItemKey = string;

export class Cart {
  constructor(
    public readonly id = uuidv4(),
    public readonly items: CartItem[] = []
  ) {}

  addItem(item: CartItemType, quantity: number = 1): CartItem {
    const existingItem = this.items.find((i) => i.item.id == item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const cartItem = new CartItem(uuidv4(), item, quantity);
      this.items.push(cartItem);
      return cartItem;
    }
  }

  deleteItem(item: CartItemType, quantity: number = 1): void {
    const existingItemIndex = this.items.findIndex((i) => i.item.id == item.id);

    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity -= quantity;
      if (this.items[existingItemIndex].quantity < 0) {
        this.items.splice(existingItemIndex, 1);
      }
    }
  }

  getItems() {
    return this.items;
  }
}
