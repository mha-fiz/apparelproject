import { useNavigate, useLocation } from "react-router-dom";
import { ProductCard } from "../index";
import "./CategoryPreview.scss";

export const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return (
    <div className="category-preview-container">
      <h2 className="title">
        <span onClick={() => navigate(`${pathname}/${title}`)}>{title}</span>
      </h2>

      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
