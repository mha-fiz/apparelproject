import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemToCart } from "../../store/reducers/cartReducer";
import {
  setModalContent,
  toggleModal,
} from "../../store/reducers/modalReducer";
import { addItemToWishlist } from "../../store/reducers/wishlistReducer";
import { cartItemsSelector } from "../../store/selectors";
import { addItemToCartAction } from "../../store/utils";
import { Button, Modal } from "../index";
import "./ProductCard.scss";

export function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { t: translate } = useTranslation();

  const itemToDispatch = addItemToCartAction(cartItems, product);
  const addProduct = () => {
    if (!currentUser) {
      toast.error("Please sign in first");
      return;
    }
    dispatch(addItemToCart(itemToDispatch));
  };
  const addProductToWishlist = () => {
    if (!currentUser) {
      toast.error("Please sign in first");
      return;
    }
    dispatch(addItemToWishlist(product));
  };

  return (
    <>
      <div className="product-card-container">
        <img src={imageUrl} alt="product" />

        <div className="product-card-footer">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </div>

        <Button
          buttonType="inverted"
          style={{ top: "10px" }}
          onClick={() => {
            dispatch(setModalContent(product));
            dispatch(toggleModal());
          }}
        >
          Show modal
        </Button>
        <Button
          buttonType="inverted"
          style={{ marginTop: "-100px" }}
          onClick={addProductToWishlist}
        >
          {translate("addToWishlist")}
        </Button>
        <Button buttonType="inverted" onClick={addProduct}>
          {translate("addToCart")}
        </Button>
      </div>
      {/* <Modal
        showModal={showModal}
        handleModalClose={() => {
          setShowModal(false);
        }}
        item={product}
      /> */}
    </>
  );
}
