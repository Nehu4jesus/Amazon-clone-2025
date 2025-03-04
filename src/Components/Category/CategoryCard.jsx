import React from "react";
import style from "./category.module.css";
function CategoryCard({ data }) {
  return (
    <div className={style.category}>
      <a href="">
        <span>{data.title}</span>
        <img src={data.imageLink} alt="" />
        <p>Shop Now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
