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
