import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import style from "./Results.module.css";

function Results() {
  const { categoryName } = useParams();
  console.log(categoryName);

  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!categoryName) {
    //   setError("No category specified. Redirecting to home...");
    //   setTimeout(() => navigate("/"), 2000); // Redirect to home after 2 seconds
    //   setLoading(false);
    //   return;
    // }

    setLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, [categoryName, navigate]);

  return (
    <LayOut>
      <div>
        <h1 style={{ padding: "30px" }}>Results</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <p style={{ padding: "30px" }}>Category/{categoryName}</p>
            <hr />
            <div className={style.products_container}>
              
              {results.length > 0 ? (
                results.map((singleProduct) => (
                  <ProductCard 
                  key={singleProduct.id} 
                  product={singleProduct}
                  render={false}
                  renderAdd={true}
                   />
                ))
              ) : (
                <p>No products found in this category.</p>
              )}
            </div>
          </>
        )}
      </div>
    </LayOut>
  );
}

export default Results;
