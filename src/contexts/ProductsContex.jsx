import { createContext, useState, useEffect } from "react";
import { getAllCategoriesAndDocuments } from "../utils/firebase.js";

export const ProductsContext = createContext({
  productCategories: {},
});

export const ProductsProvider = ({ children }) => {
  const [productCategories, setProductCategories] = useState({});

  useEffect(() => {
    const getAllShopData = async () => {
      const result = await getAllCategoriesAndDocuments();
      setProductCategories(result);
    };

    getAllShopData();
  }, []);

  return (
    <ProductsContext.Provider value={{ productCategories }}>
      {children}
    </ProductsContext.Provider>
  );
};
