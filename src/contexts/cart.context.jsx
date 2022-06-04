import { createContext, useState } from "react";

export const CartContext = createContext({
  products: null,
  setProducts: () => null,
  isCartOpen: false,
  setIsCartOpen: () => null
});

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { products, setProducts, isCartOpen, setIsCartOpen };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};