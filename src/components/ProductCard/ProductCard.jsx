import { useContext } from "react";
import { CartContext } from "../../contexts/CartContex";
import { Button } from "../index";
import "./ProductCard.scss";

export function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProduct = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="product" />

      <div className="product-card-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button buttonType="inverted" onClick={addProduct}>
        Add to cart
      </Button>
    </div>
  );
}
