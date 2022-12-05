import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProductCard, AppSkeleton } from "../../components";
import { getProductsInCategory } from "../../store/reducers/productsReducer";
import { getTranslatedTitle } from "../../utils/utils";
import "./Category.scss";

export const Category = () => {
  const productCategories = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const { categoryTitle } = useParams();

  const dispatch = useDispatch();
  const { t: translate } = useTranslation();

  useEffect(() => {
    dispatch(getProductsInCategory(categoryTitle));
  }, []);

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
          <h2
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              marginBottom: "20px",
            }}
          >
            {getTranslatedTitle(categoryTitle, translate)}
          </h2>

          <div className="products-container">
            {productCategories && (
              <>
                {productCategories.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </>
            )}
          </div>
        </>
      )}

      <ToastContainer />
    </>
  );
};
