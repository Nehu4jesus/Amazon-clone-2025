import React from "react";
import style from "./product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { useContext } from "react";
function ProductCard({ product, flex, render, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);
  // console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };
  return (
    <div
      className={`${style.card_container} ${flex ? style.product_flexed : ""}`}
    >
      {/* Updated to match CSS class */}
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {render && <div style={{ maxWidth: "700px" }}>{description}</div>}
        <div className={style.rating}>
          <Rating value={rating.rate} precision={0.1}  />
          <small>{rating.count}</small>
        </div>
        <div >
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <div className={style.product_button}>
            <button className={style.button} onClick={addToCart}>
              Add to cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
