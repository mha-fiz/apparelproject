import { useSelector } from "react-redux";
import { CategoryPreview } from "../../components/";
import { selectProductCategories } from "../../store/selectors";
import { ToastContainer } from "react-toastify";

export function CategoriesPreview() {
  const productCategories = useSelector(selectProductCategories);

  return (
    <>
      {Object.keys(productCategories).map((categoryTitle) => {
        const products = productCategories[categoryTitle];

        return (
          <CategoryPreview
            key={categoryTitle}
            products={products}
            title={categoryTitle}
          />
        );
      })}
      <ToastContainer />
    </>
  );
}
