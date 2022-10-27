import { CategoryItem } from "../";
import "./CategoriesContainer.scss";

export default function CategoriesContainer({ categories }) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
