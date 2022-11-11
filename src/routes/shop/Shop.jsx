import { CategoriesPreview, Category } from "../index";
import { Route, Routes } from "react-router-dom";

import "./Shop.scss";

export function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":categoryTitle" element={<Category />} />
    </Routes>
  );
}
