import React from "react";
import { categoryinfo } from "../Category/categoryinfo"; // Ensure this file exists and has the correct data
import CategoryCard from "./CategoryCard";
import style from "./category.module.css";

function Category() {
  return (
    <section className={style.category_container}>
      {categoryinfo?.map((singleproduct, i) => {
        return <CategoryCard key={i} data={singleproduct} />;
      })}
    </section>
  );
}

export default Category;
