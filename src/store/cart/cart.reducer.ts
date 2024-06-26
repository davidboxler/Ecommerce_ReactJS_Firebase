import { AnyAction } from 'redux';

import { setCartItems, setIsCartOpen } from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
) => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (action.type === 'CLOSE_CART') {
    return {
      ...state,
      isCartOpen: false, // establecer isCartOpen a false
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};