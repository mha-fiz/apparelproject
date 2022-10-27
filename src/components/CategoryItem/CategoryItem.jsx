import "./CategoryItem.scss";

export default function CategoryItem({ category: { title, imageUrl } }) {
  return (
    <div className="category-container">
      <div
        className="category-background"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-name-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}
