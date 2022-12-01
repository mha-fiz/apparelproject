import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartReducer";
import { addItemToWishlist } from "../../store/reducers/wishlistReducer";
import { cartItemsSelector } from "../../store/selectors";
import { addItemToCartAction } from "../../store/utils";

import { FaRegHeart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../index";
import "./Modal.scss";

export const Modal = ({ showModal, handleModalClose }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const modalContent = useSelector((state) => state.modal.modalContent);
  const cartItems = useSelector(cartItemsSelector);
  const dispatch = useDispatch();
  const itemToAdd = addItemToCartAction(cartItems, modalContent);
  const { t: translate } = useTranslation();

  const addProduct = () => {
    if (!currentUser) {
      toast.error(`${translate("pleaseSignIn")}`);
      return;
    }
    dispatch(addItemToCart(itemToAdd));
  };

  const addProductToWishlist = () => {
    if (!currentUser) {
      toast.error(`${translate("pleaseSignIn")}`);
      return;
    }
    dispatch(addItemToWishlist(modalContent));
  };

  return (
    <>
      <ReactModal
        isOpen={showModal}
        contentLabel="Product modal"
        onRequestClose={handleModalClose}
        shouldCloseOnOverlayClick={true}
        appElement={document.getElementById("root")}
        className={`content-container ${isDarkTheme ? "dark" : ""}`}
        overlayClassName={`overlay ${isDarkTheme ? "dark" : ""}`}
        bodyOpenClassName="ReactModal__Body--open"
      >
        <div className="content-body-mobile">
          <img src={modalContent?.imageUrl} alt={`${modalContent?.name}`} />
          <p className="p-text">Name:</p>
          <span>{modalContent?.name}</span>
          <p className="p-text">Price:</p>
          <span>{modalContent?.price}</span>
          <p className="p-text">Description: </p>
          <span
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            Looking for the perfect hat to keep you warm during the winter?
            You've found it! This cozy beanie is made of 100% acrylic, which is
            great for its lightweight feel and soft material. With a stretchy
            elastic band, this hat is easy to put on and take off. One size fits
            most. Looking for the perfect hat to keep you warm during the
            winter? You've found it! This cozy beanie is made of 100% acrylic,
            which is great for its lightweight feel and soft material. With a
            stretchy elastic band, this hat is easy to put on and take off. One
            size fits most. Looking for the perfect hat to keep you warm during
            the winter? You've found it! This cozy beanie is made of 100%
            acrylic, which is great for its lightweight feel and soft material.
            With a stretchy elastic band, this hat is easy to put on and take
            off. One size fits most.
          </span>
          <div className="modal-buttons">
            <Button onClick={addProduct}>Add to cart</Button>

            <Button onClick={addProductToWishlist}>
              <span
                style={{
                  color: "red",
                  height: "20px",
                  width: "20px",
                  paddingTop: "3px",
                }}
              >
                <FaRegHeart style={{ height: "inherit", width: "inherit" }} />
              </span>
            </Button>
          </div>
          <button className="close-button" onClick={handleModalClose}>
            <div
              style={{
                color: `${isDarkTheme ? "#fff" : "#000"}`,
                width: "20px",
              }}
            >
              <AiOutlineClose />
            </div>
          </button>
        </div>

        <div className="content-body">
          <div className="content-img-container">
            <img src={modalContent?.imageUrl} alt={`${modalContent?.name}`} />
          </div>
          <div className="content-body-desc">
            <div className="content-info">
              <p className="p-text">Name:</p>
              <span>{modalContent?.name}</span>
              <p className="p-text">Price:</p>
              <span>{modalContent?.price}</span>
              <p className="p-text">Description: </p>
              <span
                style={{
                  textAlign: "justify",
                  textJustify: "inter-word",
                  margin: "0",
                }}
              >
                Looking for the perfect hat to keep you warm during the winter?
                You've found it! This cozy beanie is made of 100% acrylic, which
                is great for its lightweight feel and soft material. With a
                stretchy elastic band, this hat is easy to put on and take off.
              </span>
            </div>
            <div className="modal-buttons">
              <Button onClick={addProduct}>Add to cart</Button>

              <Button onClick={addProductToWishlist}>
                <span
                  style={{
                    color: "red",
                    height: "20px",
                    width: "20px",
                    paddingTop: "3px",
                  }}
                >
                  <FaRegHeart style={{ height: "inherit", width: "inherit" }} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </ReactModal>
    </>
  );
};
