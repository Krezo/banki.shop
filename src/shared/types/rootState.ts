import { CartState } from '../../presentation/store/cartStore';
import { PictureState } from '../../presentation/store/pictureStore';

export interface RootState {
  picture: PictureState;
  cart: CartState;
}
