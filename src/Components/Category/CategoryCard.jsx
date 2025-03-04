import React from "react";
import style from "./category.module.css";
import { Link } from "react-router-dom";
function CategoryCard({ data }) {
  return (
    <div className={style.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>{data.title}</span>
        <img src={data.imageLink} alt="" />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
