import { createSelector } from "@reduxjs/toolkit";

/* PRODUCTS SELECTOR */

export const selectProductCategories = createSelector(
  (state) => state.products.products,
  (categories) =>
    categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;

      return accumulator;
    }, {})
);

/* CART SELECTOR */
const cartReducer = (state) => state.cart;

export const cartItemsSelector = createSelector(
  cartReducer,
  (cart) => cart.cartItems
);

export const isCartOpenSelector = createSelector(
  cartReducer,
  (cart) => cart.isCartOpen
);

export const cartCountSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const cartTotalSelector = createSelector(
  cartItemsSelector,
  (cartItems) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);
