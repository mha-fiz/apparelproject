import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartReducer";
import { cartItemsSelector } from "../../store/selectors";
import { addItemToCartAction } from "../../store/utils";
import { Button } from "../index";
import "./ProductCard.scss";

export function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);

  const itemToDispatch = addItemToCartAction(cartItems, product);
  const addProduct = () => {
    dispatch(addItemToCart(itemToDispatch));
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="product" />

      <div className="product-card-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button buttonType="inverted" onClick={addProduct}>
        Add to cart
      </Button>
    </div>
  );
}
