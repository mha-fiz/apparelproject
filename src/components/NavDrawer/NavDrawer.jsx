import { AiOutlineClose } from "react-icons/ai";
import { GB as EngFlag, ID as IndoFlag } from "country-flag-icons/react/3x2";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import logoLight from "../../assets/crown-white.png";
import logoDark from "../../assets/crown-black.png";
import "./NavDrawer.scss";
import { useTranslation } from "react-i18next";

export const NavDrawer = ({
  isDrawerOpen,
  drawerClosedOnElementClick,
  drawerClosedHandler,
  isDarkTheme,
  currentUser,
  cartCount,
  wishlistCount,
  currentLanguage,
  changeLanguage,
  toggleTheme,
}) => {
  const { t: translate } = useTranslation();

  return (
    <div
      className={`nav-drawer ${isDrawerOpen ? "is-active" : ""} ${
        isDarkTheme ? "dark" : ""
      }`}
    >
      <div className={`drawer-header ${isDarkTheme ? "dark" : ""}`}>
        <div
          className="drawer-logo-container"
          onClick={() => drawerClosedOnElementClick("/", drawerClosedHandler)}
        >
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
        <div onClick={toggleTheme}>
          {isDarkTheme ? (
            <div className="drawer-svg-container">
              <div className="drawer-svg">
                <MdOutlineDarkMode />
              </div>
            </div>
          ) : (
            <div className="drawer-svg-container">
              <div className="drawer-svg">
                <MdOutlineLightMode />
              </div>
            </div>
          )}
        </div>
        <div className="drawer-svg-container" onClick={changeLanguage}>
          <div className="drawer-svg">
            {currentLanguage === "en" ? <EngFlag /> : <IndoFlag />}
          </div>
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
          {translate("shop")}
        </p>
        {currentUser && (
          <>
            <p
              onClick={() =>
                drawerClosedOnElementClick("/wishlist", drawerClosedHandler)
              }
            >
              Wishlist ({wishlistCount})
            </p>
            <p
              onClick={() =>
                drawerClosedOnElementClick("/checkout", drawerClosedHandler)
              }
            >
              {translate("cart")} ({cartCount})
            </p>
          </>
        )}

        {currentUser ? (
          <p
            onClick={() => drawerClosedOnElementClick("/", drawerClosedHandler)}
          >
            {translate("signOut")}
          </p>
        ) : (
          <p
            onClick={() =>
              drawerClosedOnElementClick("/auth", drawerClosedHandler)
            }
          >
            {translate("signIn")}
          </p>
        )}
      </div>
    </div>
  );
};
