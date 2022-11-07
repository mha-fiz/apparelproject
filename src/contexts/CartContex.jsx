import { createContext, useState, useEffect } from "react";

const addItem = (cartItems, productToAdd) => {
  const isItemAlreadyExist = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (isItemAlreadyExist) {
    return cartItems.map((item) => {
      return item.id === productToAdd.id
        ? { ...item, quantity: (item.quantity += 1) }
        : { ...item };
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItem = (cartItems, productToRemove) => {
  const selectedItem = cartItems.find((item) => item.id === productToRemove.id);

  //remove item
  if (selectedItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== selectedItem.id);
  }

  return cartItems.map((item) => {
    return item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : { ...item };
  });
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = cartItems.filter(
      (item) => item.id !== productToRemove.id
    );
    setCartItems(newCartItems);
  };

  const [cartTotal, setCartTotal] = useState(0);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartCount = () => {
      if (!cartItems) return 0;
      const updatedCartCount = cartItems.reduce(
        (total, currentItem) => (total += currentItem.quantity),
        0
      );

      return updatedCartCount;
    };

    setCartCount(cartCount);
  }, [cartItems]);

  useEffect(() => {
    const cartTotal = () => {
      if (!cartItems) return 0;
      const updatedCartTotal = cartItems.reduce(
        (total, currentItem) =>
          total + currentItem.quantity * currentItem.price,
        0
      );

      return updatedCartTotal;
    };

    setCartTotal(cartTotal);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
