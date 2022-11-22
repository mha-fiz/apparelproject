import { useDispatch, useSelector } from "react-redux";
import { cartItemsSelector } from "../../store/selectors";
import { removeItemFromWishlist } from "../../store/reducers/wishlistReducer";
import { addItemToCart } from "../../store/reducers/cartReducer";
import { addItemToCartAction } from "../../store/utils";
import { Button } from "../index";
import "./WishlistItem.scss";

export const WishlistItem = ({ item }) => {
  const { imageUrl, name, price } = item;
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.list);
  const cartItems = useSelector(cartItemsSelector);

  const moveItemToCart = (product) => {
    const newState = wishlist.filter((item) => item.id !== product.id);
    dispatch(removeItemFromWishlist(newState));

    dispatch(addItemToCart(addItemToCartAction(cartItems, product)));
  };

  const removeProductFromWishlist = (product) => {
    const newState = wishlist.filter((item) => item.id !== product.id);
    dispatch(removeItemFromWishlist(newState));
  };

  return (
    <div className="wishlist-item-container">
      <div className="wishlist-item-desc">
        <img src={imageUrl} alt={`${name}`} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </div>
      <div className="wishlist-item-buttons">
        <Button
          onClick={() => removeProductFromWishlist(item)}
          style={{ marginBottom: "10px" }}
        >
          Remove from wishlist
        </Button>
        <Button onClick={() => moveItemToCart(item)}>Move item to cart</Button>
      </div>
    </div>
  );
};
