import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { CART_ACTION_TYPES } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { Logo, NavigationContainer, NavLinks, NavLink } from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cartState, modifyCart } = useContext(CartContext);
  const { isCartOpen } = cartState;

  const signOutHandler = async () => {
    await signOutUser();
  }

  const cartClickHandler = () => {
    modifyCart({ type: CART_ACTION_TYPES.TOGGLE_OPEN, payload: null });
  }

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to="/">
          <CrwnLogo />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>SIGN OUT</NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon clickHandler={cartClickHandler} />
        </NavLinks>
        {isCartOpen ? <CartDropdown /> : null }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
