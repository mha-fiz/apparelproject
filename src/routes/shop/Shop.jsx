import { useContext } from "react";
import { ProductCard } from "../../components/";
import { ProductsContext } from "../../contexts/ProductsContex";

import "./Shop.scss"

export function Shop() {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
