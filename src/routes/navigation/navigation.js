import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from "./navigation.styles";
import { ReactComponent as Logo } from "../../assets/img/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from "../../services/firebase";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../../store/user/user.selector'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { isCartOpen } = useContext(CartContext)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SING OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">
              SING IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
