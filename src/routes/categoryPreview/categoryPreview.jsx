import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSkeleton, CategoryPreview } from "../../components/";
import { ToastContainer } from "react-toastify";
import "./categoryPreview.scss";
import { getProductsCategoriesPreview } from "../../store/reducers/productsReducer";

export function CategoriesPreview() {
  const isLoading = useSelector((state) => state.products.isLoading);
  const categoriesPreview = useSelector(
    (state) => state.products.productsCategoriesPreview
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categoriesPreview.length) {
      dispatch(getProductsCategoriesPreview());
    }
  }, [categoriesPreview]);

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
          {categoriesPreview.map((category) => {
            return (
              <CategoryPreview
                key={category.category}
                title={category.category}
                products={category.items}
              />
            );
          })}
        </>
      )}

      <ToastContainer />
    </>
  );
}
