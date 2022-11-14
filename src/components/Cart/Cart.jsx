import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import "./Cart.scss";

export function Cart() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <span>Cart</span>
      <span style={{ marginLeft: "5px" }}>({cartCount})</span>
    </div>
  );
}
