import { useSelector } from "react-redux";
import { AppSkeleton, CategoryPreview } from "../../components/";
import { selectProductCategories } from "../../store/selectors";
import { ToastContainer } from "react-toastify";
import "./categoryPreview.scss";

export function CategoriesPreview() {
  const isLoading = useSelector((state) => state.products.isLoading);
  const productCategories = useSelector(selectProductCategories);

  return (
    <>
      {isLoading ? (
        <div>
          <div>
            <AppSkeleton width={100} height={45} />
          </div>
          <div className="loading-skeleton-container">
            {[...Array(4)].map((_, idx) => (
              <div key={idx}>
                <AppSkeleton height={320} />
                <AppSkeleton height={25} />
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}

      <ToastContainer />
    </>
  );
}
