import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getTranslatedTitle } from "../../utils/utils";
import "./CategoryItem.scss";

export default function CategoryItem({ category: { title, imageUrl } }) {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  return (
    <div
      className={`category-container ${title}`}
      onClick={() => navigate(`/shop/${title}`)}
    >
      <div
        className="category-background"
        style={{
          backgroundImage: `linear-gradient(rgba(47,47,47,.7), rgba(47,47,47,.7)), url(${imageUrl})`,
        }}
      />
      <div className="category-name-container">
        <h2>{getTranslatedTitle(title, translate)}</h2>
        <p>{translate("shopNow")}</p>
      </div>
    </div>
  );
}
