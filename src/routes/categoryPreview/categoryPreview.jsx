import { useContext } from "react";
import { CategoryPreview } from "../../components/";
import { ProductsContext } from "../../contexts/ProductsContex";

export function CategoriesPreview() {
  const { productCategories } = useContext(ProductsContext);

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
    </>
  );
}
