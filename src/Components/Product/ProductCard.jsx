import React from "react";
import style from "./product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";

function ProductCard({ product }) {
  const { image, title, id, rating, price } = product;

  return (
    <div className={style.product_card}>
      {" "}
      {/* Updated to match CSS class */}
      <a href={`/product/${id}`} aria-label={title}>
        <img src={image} alt={title} className={style.product_image} />
      </a>
      <div className={style.product_details}>
        <h3 className={style.product_title}>{title}</h3>
        <div className={style.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small className={style.rating_count}>{rating.count}</small>
        </div>
        <div className={style.product_price}>
          <CurrencyFormat amount={price} />
        </div>
        <div className={style.product_button}>
          <button className={style.button}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
