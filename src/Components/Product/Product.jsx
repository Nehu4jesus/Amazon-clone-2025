import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./product.module.css";
import ProductCard from "./ProductCard";
function Product() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={style.product_container}>
      {products?.map((single_product, i) => {
        return <ProductCard 
        key={i} 
        product={single_product}
        renderAdd={true}
         />;
      })}
    </div>
  );
}

export default Product;
