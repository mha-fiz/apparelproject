import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProductCard } from "../../components";
import { selectProductCategories } from "../../store/selectors";
import "./Category.scss";

export const Category = () => {
  const productCategories = useSelector(selectProductCategories);
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
      <ToastContainer />
    </>
  );
};
