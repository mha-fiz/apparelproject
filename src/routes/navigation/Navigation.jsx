import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/reducers/userReducer";
import { Outlet, useNavigate } from "react-router-dom";
import { Cart, CartDropdown } from "../../components";
import { signOutUser } from "../../utils/firebase";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { cartCountSelector, isCartOpenSelector } from "../../store/selectors";
import { toggleTheme } from "../../store/reducers/configReducer";
import logoDark from "../../assets/crown-black.png";
import logoLight from "../../assets/crown-white.png";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { GB as EngFlag } from "country-flag-icons/react/3x2";
import "./Navigation.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.config.isDarkTheme);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
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
    <div className={`app-layout ${isDarkTheme ? "dark" : ""}`}>
      <header className={`navigation ${isDarkTheme ? "dark" : ""}`}>
        <div className="logo-container" onClick={() => navigate("/")}>
          <img
            src={logoLight}
            alt="company logo"
            style={{ display: `${isDarkTheme ? "block" : "none"}` }}
          />
          <img
            src={logoDark}
            alt="company logo"
            style={{ display: `${isDarkTheme ? "none" : "block"}` }}
          />
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
          <div className="nav-link">
            <Cart />
          </div>
          <div className="nav-link" onClick={() => dispatch(toggleTheme())}>
            {isDarkTheme ? (
              <div className="nav-svg-container">
                <div className="nav-svg">
                  <MdOutlineLightMode
                    style={{ height: "inherit", width: "inherit" }}
                  />
                </div>
              </div>
            ) : (
              <div className="nav-svg-container">
                <div className="nav-svg">
                  <MdOutlineDarkMode />
                </div>
              </div>
            )}
          </div>
          <div className="nav-link">
            <div className="nav-svg-container">
              <div className="nav-svg">
                <EngFlag />
              </div>
            </div>
          </div>
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
              <img
                src={isDarkTheme ? logoLight : logoDark}
                alt="company logo"
              />
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

      <footer>
        <p>Created by Muhamad Hafiz.</p>
      </footer>
    </div>
  );
};

export default Navigation;
