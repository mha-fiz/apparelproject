import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components";
import { ProductsContext } from "../../contexts/ProductsContex";
import "./Category.scss";

export const Category = () => {
  const { productCategories } = useContext(ProductsContext);
  const { categoryTitle } = useParams();
  const [products, setProducts] = useState(productCategories[categoryTitle]);

  useEffect(() => {
    setProducts(productCategories[categoryTitle]);
  }, [productCategories, categoryTitle]);

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          marginBottom: "20px",
        }}
      >
        {categoryTitle}
      </h2>

      <div className="products-container">
        {products && (
          <>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
    </>
  );
};
