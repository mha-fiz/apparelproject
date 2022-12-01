import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

import { addItemToCart } from "../../store/reducers/cartReducer";
import {
  setModalContent,
  toggleModal,
} from "../../store/reducers/modalReducer";
import { addItemToWishlist } from "../../store/reducers/wishlistReducer";
import { cartItemsSelector } from "../../store/selectors";
import { addItemToCartAction } from "../../store/utils";
import { Button } from "../index";
import "./ProductCard.scss";

export function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { t: translate } = useTranslation();

  const itemToAdd = addItemToCartAction(cartItems, product);
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
        <div
          className="detail-modal-button"
          onClick={() => {
            dispatch(setModalContent(product));
            dispatch(toggleModal());
          }}
        >
          <div className="detail-svg-container">
            <AiOutlineEye />
          </div>
        </div>

        <div className="wishlist-button" onClick={addProductToWishlist}>
          <div className="wishlist-svg-container">
            <AiOutlineHeart />
          </div>
        </div>

        <Button buttonType="inverted" onClick={addProduct}>
          {translate("addToCart")}
        </Button>
      </div>
    </>
  );
}
