import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/reducers/userReducer";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Cart, CartDropdown } from "../../components";
import { signOutUser } from "../../utils/firebase";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/crown-white.png";
import "./Navigation.scss";
import { cartCountSelector, isCartOpenSelector } from "../../store/selectors";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isCartOpen = useSelector(isCartOpenSelector);
  const cartCount = useSelector(cartCountSelector);
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
    dispatch(setCurrentUser(null));
  };

  const drawerClosedOnElementClick = (path, callback) => {
    navigate(path);
    callback();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header className="navigation">
        <div className="nav-links-left">
          <Link to="/shop/mens">Mens</Link>
          <Link to="/shop/womens">Womens</Link>
          <Link to="/shop/jackets">Jackets</Link>
          <Link to="/shop/hats">Hats</Link>
          <Link to="/shop/sneakers">Sneakers</Link>
        </div>

        <div className="logo-container" onClick={() => navigate("/")}>
          <img src={logo} alt="company logo" />
        </div>

        <div className="nav-links-container">
          <div className="nav-link" to="shop" onClick={() => navigate("/shop")}>
            <span>Shop</span>
          </div>
          {!currentUser ? (
            <div
              className="nav-link"
              to="auth"
              onClick={() => navigate("/auth")}
            >
              <span>Sign In</span>
            </div>
          ) : (
            <div className="nav-link" onClick={signOutHandler}>
              <span>Sign Out</span>
            </div>
          )}
          <Cart />
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
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer
        style={{
          height: "50px",
          backgroundColor: "greenyellow",
          width: "100%",
        }}
      >
        FOOOTERm
      </footer>
    </div>
  );
};

export default Navigation;
