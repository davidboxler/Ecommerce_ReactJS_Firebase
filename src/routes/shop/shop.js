import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";

import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../services/firebase";
import { setCategories } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray))
    };

    getCategoriesMap()
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
