import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  else return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subtractCartItem = (cartItems, productToSubtract) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToSubtract.id
  );
  if (existingCartItem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToSubtract.id
        ? cartItem.quantity <= 1
          ? { ...cartItem}
          : { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  else throw new Error("Item to be subtracted doesn't exist in the cart");
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingCartItem)
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  else throw new Error("Item to be removed doesn't exist in the cart");
};

export const CartContext = createContext({
  cartState: {},
  modifyCart: () => null,
});

export const CART_ACTION_TYPES = {
  ADD: "add_product",
  SUBTRACT: "subtract_product",
  REMOVE: "remove_product",
  TOGGLE_OPEN: "toggle_cart_open",
};

const cartReducer = (state, action) => {
  // console.log("executing cartReducer function");
  const { type, payload } = action;
  const { cartItems, isCartOpen } = state;
  if (type === CART_ACTION_TYPES.TOGGLE_OPEN)
    return { ...state, isCartOpen: !isCartOpen };
  else {
    let newCartItems = [];
    switch (type) {
      case CART_ACTION_TYPES.ADD:
        newCartItems = addCartItem(cartItems, payload);
        break;
      case CART_ACTION_TYPES.SUBTRACT:
        newCartItems = subtractCartItem(cartItems, payload);
        break;
      case CART_ACTION_TYPES.REMOVE:
        newCartItems = removeCartItem(cartItems, payload);
        break;
      default:
        throw new Error(`Incorrect cart action type: ${type}`);
    }
    let newCartCount = 0;
    let newCartTotal = 0;
    newCartItems.forEach((cartItem) => {
      newCartCount += cartItem.quantity;
      newCartTotal += cartItem.quantity * cartItem.price;
    });
    return {
      cartItems: newCartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
      isCartOpen: isCartOpen,
    };
  }
};

const INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

export const CartProvider = ({ children }) => {
  const [cartState, modifyCart] = useReducer(cartReducer, INITIAL_STATE);

  const value = {
    cartState,
    modifyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* Old code, based on useState and useEffect

import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  else return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const modifyCart = (cartItems, action, itemId) => {
  switch (action) {
    case "increase":
      return cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    case "decrease":
      return cartItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) }
          : cartItem
      );
    case "remove":
      return cartItems.filter(cartItem => cartItem.id !== itemId);
    default: console.log("Invalid (action) parameter in modifyCart function.");
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  modifyCartItem: () => null,
  cartCount: 0,
  setCartCount: () => null,
  cartPrice: 0,
  setCartPrice: () => null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
    const newCartPrice = cartItems.reduce(
      (total, currentItem) => total + currentItem.quantity * currentItem.price,
      0
    );
    setCartCount(newCartCount);
    setCartPrice(newCartPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const modifyCartItem = (action, itemId) => {
    setCartItems(modifyCart(cartItems, action, itemId));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    modifyCartItem,
    cartCount,
    cartPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
*/
