import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Cart, CartDropdown } from "../../components";
import { CartContext } from "../../contexts/CartContex";
import { UserContext } from "../../contexts/UserContext";
import { signOutUser } from "../../utils/firebase";
import "./Navigation.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="shop">
            Shop
          </Link>
          {!currentUser ? (
            <Link className="nav-link" to="auth">
              Sign In
            </Link>
          ) : (
            <span className="nav-link" onClick={signOutHandler}>
              Sign out
            </span>
          )}
          <Cart />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
