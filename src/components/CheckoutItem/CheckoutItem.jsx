import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import "./CheckoutItem.scss";

export function CheckoutItem({ item }) {
  const { imageUrl, name, quantity, price } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => removeItemFromCart(item);
  const clearItemHandler = () => clearItemFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <div className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          {/* &#10094; */}
          <AiOutlineMinusCircle />
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          {/* &#10095; */}
          <AiOutlinePlusCircle />
        </div>
      </div>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        {/* &#10005; */}
        <AiOutlineDelete />
      </div>
    </div>
  );
}
