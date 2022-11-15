import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import { Button, CartItem } from "../index";
import "./CartDropdown.scss";

export const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
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
          setIsCartOpen(false);
        }}
      >
        Go to checkout
      </Button>
    </div>
  );
};
