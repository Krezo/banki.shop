import { CartItemType } from '../interfaces/ICartItem';

export class CartItem {
  constructor(
    public readonly id: string,
    public readonly item: CartItemType,
    private _quantity: number
  ) {
    this.validateQuantity(_quantity);
  }

  private validateQuantity(quantity: number): void {
    if (quantity < 1) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this.validateQuantity(value);
    this._quantity = value;
  }

  getTotal(): number {
    return this.item.price * this._quantity;
  }
}