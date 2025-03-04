import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./product.module.css";
import ProductCard from "./ProductCard";

function Product() {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log("API Response:", res.data); // Log the response for debugging
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err); // Log the error for debugging
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array for one-time fetch on mount

  if (loading) {
    return <div className={style.loading}>Loading products...</div>; // Loading fallback
  }

  if (error) {
    return <div className={style.error}>Error: {error}</div>; // Error fallback
  }

  return (
    <div className={style.product_container}>
      {products.map((singleProduct) => (
        <ProductCard product={singleProduct} key={singleProduct.id} />
      ))}
    </div>
  );
}

export default Product;
