import { useContext } from "react";
import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/CartContex";
import "./Cart.scss";

export function Cart() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <CartIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
}
