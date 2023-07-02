import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import "./navigation.scss";
import { ReactComponent as Logo } from "../../assets/img/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";
import { signOutUser } from "../../services/firebase";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext)

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SING OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SING IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
