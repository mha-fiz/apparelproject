import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppSkeleton, ProductCard } from "../index";
import { getTranslatedTitle } from "../../utils/utils";
import "./CategoryPreview.scss";

export const CategoryPreview = ({ title, products }) => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const { t: translate } = useTranslation();

  return (
    <div className="category-preview-container">
      <h2>
        <Link
          className={`title ${isDarkTheme ? "dark" : ""}`}
          to={`/shop/${title}`}
        >
          {getTranslatedTitle(title, translate)}
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
