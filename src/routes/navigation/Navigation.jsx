import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Cart, CartDropdown } from "../../components";
import { CartContext } from "../../contexts/CartContex";
import { UserContext } from "../../contexts/UserContext";
import { signOutUser } from "../../utils/firebase";
import {
  AiOutlineLogin,
  AiOutlineShop,
  AiOutlineLogout,
  AiOutlineClose,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/crown-black.png";
import "./Navigation.scss";

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const drawerClosedHandler = () => {
    setIsDrawerOpen(false);

    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    document.body.style.overflow = "unset";
  };

  const drawerOpenHandler = () => {
    setIsDrawerOpen(true);

    // Disables Background Scrolling whilst the SideDrawer/Modal is open
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const drawerClosedOnElementClick = (path, callback) => {
    navigate(path);
    callback();
  };

  return (
    <>
      <div className={`navigation`}>
        <div className="logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="company logo" />
        </div>

        <div className="nav-links-container">
          <div className="nav-link" to="shop" onClick={() => navigate("/shop")}>
            <div
              style={{
                marginRight: "10px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              <AiOutlineShop />
            </div>
            Shop
          </div>
          {!currentUser ? (
            <div
              className="nav-link"
              to="auth"
              onClick={() => navigate("/auth")}
            >
              <div
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              >
                <AiOutlineLogin />
              </div>
              Sign In
            </div>
          ) : (
            <div className="nav-link" onClick={signOutHandler}>
              <div
                style={{
                  marginRight: "10px",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              >
                <AiOutlineLogout />
              </div>
              Sign out
            </div>
          )}
          {currentUser && <Cart />}
        </div>
        <div className="nav-hamburger" onClick={drawerOpenHandler}>
          <GiHamburgerMenu className="nav-hamburger-icon" />
        </div>
        <div className={`nav-drawer ${isDrawerOpen ? "is-active" : ""}`}>
          <div className="drawer-header">
            <div
              className="logo-container"
              onClick={() =>
                drawerClosedOnElementClick("/", drawerClosedHandler)
              }
            >
              <img src={logo} alt="company logo" />
            </div>
            <div
              style={{ width: "30px", height: "30px", marginRight: "50px" }}
              onClick={drawerClosedHandler}
            >
              <AiOutlineClose style={{ width: "inherit", height: "inherit" }} />
            </div>
          </div>
          <div className="drawer-content">
            <p
              onClick={() =>
                drawerClosedOnElementClick("/shop", drawerClosedHandler)
              }
            >
              Shop
            </p>
            {currentUser && (
              <p
                onClick={() =>
                  drawerClosedOnElementClick("/checkout", drawerClosedHandler)
                }
              >
                Cart ({cartCount})
              </p>
            )}

            {currentUser ? (
              <p
                onClick={() =>
                  drawerClosedOnElementClick("/", drawerClosedHandler)
                }
              >
                Sign Out
              </p>
            ) : (
              <p
                onClick={() =>
                  drawerClosedOnElementClick("/auth", drawerClosedHandler)
                }
              >
                Sign In
              </p>
            )}
          </div>
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
