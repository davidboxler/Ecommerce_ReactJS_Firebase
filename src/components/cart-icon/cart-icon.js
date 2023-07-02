import React, { useContext } from "react";
import { ReactComponent as ShoppingCart } from "../../assets/img/shopping-bag.svg";
import { CartContext } from '../../contexts/cart-context'
import './cart-icon.scss'

export const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingCart className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
