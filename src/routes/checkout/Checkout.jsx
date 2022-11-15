import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContex";
import { CheckoutItem } from "../../components";
import "./Checkout.scss";

export const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="checkout-container">
        {!cartItems.length ? (
          <>
            <h2>Your cart is empty</h2>
            <Link to="/shop" style={{ textDecoration: "underline" }}>
              Go to shop
            </Link>
          </>
        ) : (
          <>
            <div className="checkout-header">
              <div className="header-block">
                <span>Product</span>
              </div>
              <div className="header-block">
                <span>Description</span>
              </div>
              <div className="header-block">
                <span>Quantity</span>
              </div>
              <div className="header-block">
                <span>Price</span>
              </div>
              <div className="header-block">
                <span>Remove</span>
              </div>
            </div>
            {cartItems.map((item) => (
              <CheckoutItem key={item.id} item={item} />
            ))}
            <div className="total">TOTAL: ${cartTotal}</div>
          </>
        )}
      </div>

      {/* MOBILE VIEW */}
      <div className="checkout-container-mobile">
        {!cartItems.length ? (
          <>
            <h2>Your cart is empty</h2>
            <Link to="/shop" style={{ textDecoration: "underline" }}>
              Go to shop
            </Link>
          </>
        ) : (
          <>
            <h2>CHECKOUT</h2>
            {cartItems.map((item) => (
              <CheckoutItem key={item.id} item={item} isMobileView />
            ))}
            <div className="total">TOTAL: ${cartTotal}</div>
          </>
        )}
      </div>
    </>
  );
};
