import { createContext, useReducer } from "react";

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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEM: "SET_CART_ITEM",
  TOGGLE_CART_DROPDOWN: "TOGGLE_CART_DROPDOWN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      throw new Error(`Unhandled type: ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, disptach] = useReducer(cartReducer, INITIAL_STATE);

  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const updateCartReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, currentItem) => (total += currentItem.quantity),
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, currentItem) => total + currentItem.quantity * currentItem.price,
      0
    );

    disptach({
      type: CART_ACTION_TYPES.SET_CART_ITEM,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const setIsCartOpen = () => {
    disptach({
      type: CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN,
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addItem(cartItems, productToAdd);
    updateCartReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeItem(cartItems, productToRemove);
    updateCartReducer(newCartItems);
  };

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = cartItems.filter(
      (item) => item.id !== productToRemove.id
    );

    updateCartReducer(newCartItems);
  };

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
