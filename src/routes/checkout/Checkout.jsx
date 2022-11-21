import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckoutItem } from "../../components";
import { cartItemsSelector, cartTotalSelector } from "../../store/selectors";
import "./Checkout.scss";

export const Checkout = () => {
  const cartItems = useSelector(cartItemsSelector);
  const cartTotal = useSelector(cartTotalSelector);
  const { t: translate } = useTranslation();

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="checkout-container">
        {!cartItems.length ? (
          <>
            <h2>{translate("yourCartEmpty")}</h2>
            <Link to="/shop" style={{ textDecoration: "underline" }}>
              {translate("goToShop")}
            </Link>
          </>
        ) : (
          <>
            <div className="checkout-header">
              <div className="header-block">
                <span>{translate("product")}</span>
              </div>
              <div className="header-block">
                <span>{translate("description")}</span>
              </div>
              <div className="header-block">
                <span>{translate("quantity")}</span>
              </div>
              <div className="header-block">
                <span>{translate("price")}</span>
              </div>
              <div className="header-block">
                <span>{translate("remove")}</span>
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
            <h2>{translate("yourCartEmpty")}</h2>
            <Link to="/shop" style={{ textDecoration: "underline" }}>
              {translate("goToShop")}
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
