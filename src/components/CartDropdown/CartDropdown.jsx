import { useNavigate } from "react-router-dom";
import { Button, CartItem } from "../index";
import "./CartDropdown.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/reducers/cartReducer";
import { cartItemsSelector } from "../../store/selectors";

export const CartDropdown = () => {
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();
  const toggleCartDropdown = () => dispatch(setIsCartOpen());
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span style={{ margin: "50px auto", color: "#000" }}>
            Your cart is empty
          </span>
        )}
      </div>
      <Button
        onClick={() => {
          navigate("/checkout");
          toggleCartDropdown();
        }}
      >
        Go to checkout
      </Button>
    </div>
  );
};
