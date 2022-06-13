import { createSelector } from "reselect";

const selectCartItemsReducer = (state) => state.cart.cartItems;

export const selectCartItems = createSelector(
  [selectCartItemsReducer],
  (cartItems) => cartItems
);

export const selectCartCount = createSelector(
  [selectCartItemsReducer],
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItemsReducer],
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);

export const selectCartState = (state) => state.cart.isCartOpen;
