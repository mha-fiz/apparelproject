import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import { Button, CartItem } from "../index";
import "./CartDropdown.scss";

export const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button onClick={() => navigate("/checkout")}>Go to checkout</Button>
    </div>
  );
};
