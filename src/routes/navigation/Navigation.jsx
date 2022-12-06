import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setCurrentUser } from "../../store/reducers/userReducer";
import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cart, CartDropdown, Modal, NavDrawer } from "../../components";
import { signOutUser } from "../../utils/firebase";
import { GiHamburgerMenu } from "react-icons/gi";
import { cartCountSelector, isCartOpenSelector } from "../../store/selectors";
import { toggleTheme as toggleThemeAction } from "../../store/reducers/themeReducer";
import { toggleLanguage } from "../../store/reducers/languageReducer";

import logoDark from "../../assets/crown-black.png";
import logoLight from "../../assets/crown-white.png";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { GB as EngFlag, ID as IndoFlag } from "country-flag-icons/react/3x2";
import "./Navigation.scss";
import {
  clearModalContent,
  toggleModal,
} from "../../store/reducers/modalReducer";

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const isCartOpen = useSelector(isCartOpenSelector);
  const cartCount = useSelector(cartCountSelector);
  const wishlistCount = useSelector((state) => state.wishlist.list.length);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const modalContent = useSelector((state) => state.modal.modalContent);
  const navigate = useNavigate();
  const { t: translate, i18n } = useTranslation();

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

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  const changeLanguage = () => {
    if (currentLanguage === "en") {
      i18n.changeLanguage("id");
      dispatch(toggleLanguage("id"));
      return;
    }

    if (currentLanguage === "id") {
      i18n.changeLanguage("en");
      dispatch(toggleLanguage("en"));
      return;
    }
  };

  return (
    <>
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
            <div
              className="nav-link"
              to="shop`"
              onClick={() => navigate("/shop")}
            >
              <span>{translate("shop")}</span>
            </div>
            {currentUser && (
              <div
                className="nav-link"
                to="shop"
                onClick={() => navigate("/wishlist")}
              >
                <div className="nav-svg-container">
                  <div style={{ height: "20px", width: "20px" }}>
                    <FaRegHeart
                      style={{ height: "inherit", width: "inherit" }}
                    />
                  </div>
                  <span style={{ marginLeft: "10px" }}>({wishlistCount})</span>
                </div>
              </div>
            )}
            {currentUser && (
              <div className="nav-link">
                <Cart />
              </div>
            )}
            {!currentUser ? (
              <div
                className="nav-link"
                to="auth"
                onClick={() => navigate("/auth")}
              >
                <span>{translate("signIn")}</span>
              </div>
            ) : (
              <div className="nav-link" onClick={signOutHandler}>
                <span>{translate("signOut")}</span>
              </div>
            )}
            <div className="nav-link" onClick={toggleTheme}>
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
              <div className="nav-svg-container" onClick={changeLanguage}>
                <div className="nav-svg">
                  {currentLanguage === "en" ? <EngFlag /> : <IndoFlag />}
                </div>
              </div>
            </div>
          </div>
          <div className="nav-hamburger" onClick={drawerOpenHandler}>
            <GiHamburgerMenu className="nav-hamburger-icon" />
          </div>
          <NavDrawer
            currentUser={currentUser}
            cartCount={cartCount}
            drawerClosedOnElementClick={drawerClosedOnElementClick}
            drawerClosedHandler={drawerClosedHandler}
            isDrawerOpen={isDrawerOpen}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
            wishlistCount={wishlistCount}
          />
          {isCartOpen && <CartDropdown />}
        </header>

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>

        <footer>
          <p>Created by Muhamad Hafiz.</p>
        </footer>
      </div>
      {modalContent && (
        <Modal
          showModal={isModalOpen}
          handleModalClose={() => {
            dispatch(toggleModal());
            dispatch(clearModalContent());
          }}
        />
      )}
    </>
  );
};

export default Navigation;
