import { useNavigate } from "react-router-dom";
import "./CategoryItem.scss";

export default function CategoryItem({ category: { title, imageUrl } }) {
  const navigate = useNavigate();

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
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}
