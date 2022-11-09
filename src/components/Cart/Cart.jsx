import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import {BsCart2} from "react-icons/bs"
import "./Cart.scss";

export function Cart() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <div
        style={{
          marginRight: "10px",
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        <BsCart2 className="shopping-icon" />
      </div>
      <span>({cartCount})</span>
    </div>
  );
}
