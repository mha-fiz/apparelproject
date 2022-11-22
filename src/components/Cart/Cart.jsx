import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/reducers/cartReducer";
import { cartCountSelector } from "../../store/selectors";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Cart.scss";

export function Cart() {
  const dispatch = useDispatch();
  const cartCount = useSelector(cartCountSelector);

  const toggleCart = () => dispatch(setIsCartOpen());

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <div style={{ height: "20px", width: "20px" }}>
        <AiOutlineShoppingCart
          style={{ height: "inherit", width: "inherit" }}
        />
      </div>
      <span style={{ marginLeft: "10px" }}>({cartCount})</span>
    </div>
  );
}
