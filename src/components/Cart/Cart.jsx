import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import "./Cart.scss";

export function Cart() {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen();

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <span>Cart</span>
      <span style={{ marginLeft: "5px" }}>({cartCount})</span>
    </div>
  );
}
