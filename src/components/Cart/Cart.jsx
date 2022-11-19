import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/reducers/cartReducer";
import { cartCountSelector } from "../../store/selectors";
import "./Cart.scss";

export function Cart() {
  const dispatch = useDispatch();
  const cartCount = useSelector(cartCountSelector);

  const toggleCart = () => dispatch(setIsCartOpen());

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <span>Cart</span>
      <span style={{ marginLeft: "5px" }}>({cartCount})</span>
    </div>
  );
}
