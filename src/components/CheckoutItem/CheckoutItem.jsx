import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import "./CheckoutItem.scss";

export function CheckoutItem({ item, isMobileView = false }) {
  const { imageUrl, name, quantity, price } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(item);
  const removeItemHandler = () => removeItemFromCart(item);
  const clearItemHandler = () => clearItemFromCart(item);

  if (!isMobileView)
    return (
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name"> {name} </span>
        <div className="quantity">
          <div className="arrow" onClick={removeItemHandler}>
            <AiOutlineMinusCircle />
          </div>
          <span className="value">{quantity}</span>
          <div className="arrow" onClick={addItemHandler}>
            <AiOutlinePlusCircle />
          </div>
        </div>
        <span className="price"> {price}</span>
        <div className="remove-button" onClick={clearItemHandler}>
          <AiOutlineDelete />
        </div>
      </div>
    );

  return (
    <div className="checkout-item-mobile">
      <img src={imageUrl} alt="product" height={125} width={100} />
      <div className="item-description-mobile">
        <p style={{ margin: "0", fontWeight: "bold" }}>{name}</p>
        <div className="quantity-mobile">
          <span className="value">Quantity: {quantity}</span>
          <div
            style={{
              width: "16px",
              height: "16px",
              margin: "3px 5px 0",
            }}
            onClick={removeItemHandler}
          >
            <AiOutlineMinusCircle
              style={{ width: "inherit", height: "inherit" }}
            />
          </div>
          <div
            style={{
              width: "16px",
              height: "16px",
              margin: "3px 5px 0",
            }}
            onClick={addItemHandler}
          >
            <AiOutlinePlusCircle
              style={{ width: "inherit", height: "inherit" }}
            />
          </div>
        </div>
        <span className="price">Price: {price}</span>
        <div style={{ color: "#B21111" }} onClick={clearItemHandler}>
          <AiOutlineDelete />
        </div>
      </div>
    </div>
  );
}
