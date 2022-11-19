export const addItemToCartAction = (cartItems, productToAdd) => {
  const addItem = (cartItems, productToAdd) => {
    const isItemAlreadyExist = cartItems.find(
      (item) => item.id === productToAdd.id
    );

    if (!isItemAlreadyExist) {
      return [...cartItems, { ...productToAdd, quantity: 1 }];
    }

    const incrementQuantity = cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : { ...item }
    );

    return incrementQuantity;
  };

  return addItem(cartItems, productToAdd);
};
export const removeItemFromCartAction = (cartItems, productToRemove) => {
  const removeItem = (cartItems, productToRemove) => {
    const selectedItem = cartItems.find(
      (item) => item.id === productToRemove.id
    );

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

  return removeItem(cartItems, productToRemove);
};

export const clearItemFromCartAction = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};
