import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsSelector } from "../../store/selectors";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/reducers/cartReducer";
import {
  addItemToCartAction,
  clearItemFromCartAction,
  removeItemFromCartAction,
} from "../../store/utils";
import "./CheckoutItem.scss";
import { useTranslation } from "react-i18next";
import { FaRegHeart } from "react-icons/fa";
import { addItemToWishlist } from "../../store/reducers/wishlistReducer";

export function CheckoutItem({ item, isMobileView = false }) {
  const { imageUrl, name, quantity, price } = item;
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();

  const itemToAdd = addItemToCartAction(cartItems, item);
  const addItemHandler = () => dispatch(addItemToCart(itemToAdd));

  const itemToRemove = removeItemFromCartAction(cartItems, item);
  const removeItemHandler = () => dispatch(removeItemFromCart(itemToRemove));

  const itemToClear = clearItemFromCartAction(cartItems, item);
  const clearItemHandler = () => dispatch(clearItemFromCart(itemToClear));

  const moveProductToWishlist = () => {
    dispatch(addItemToWishlist(item));
    dispatch(clearItemFromCart(itemToClear));
  };

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
          <div style={{ marginBottom: "10px" }}>
            <AiOutlineDelete />
          </div>
          <div style={{ color: "red" }} onClick={moveProductToWishlist}>
            <FaRegHeart />
          </div>
        </div>
      </div>
    );

  return (
    <div className="checkout-item-mobile">
      <img src={imageUrl} alt="product" height={125} width={100} />
      <div className="item-description-mobile">
        <p style={{ margin: "0", fontWeight: "bold" }}>{name}</p>
        <div className="quantity-mobile">
          <span className="value">
            {translate("quantity")}: {quantity}
          </span>
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
        <span className="price">
          {translate("price")}: {price}
        </span>
        <div onClick={clearItemHandler}>
          <AiOutlineDelete />
        </div>
        <div style={{ color: "red" }} onClick={moveProductToWishlist}>
          <FaRegHeart />
        </div>
      </div>
    </div>
  );
}
