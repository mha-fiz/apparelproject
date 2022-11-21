import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCard } from "../index";
import "./CategoryPreview.scss";

export const CategoryPreview = ({ title, products }) => {
  const isDarkTheme = useSelector((state) => state.config.isDarkTheme);

  return (
    <div className="category-preview-container">
      <h2>
        <Link
          className={`title ${isDarkTheme ? "dark" : ""}`}
          to={`/shop/${title}`}
        >
          {title}
        </Link>
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
