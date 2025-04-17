import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoints";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  // console.log(productId)
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    //https://fakestoreapi.com/products/7
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res)
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard 
        product={product} 
        flex={true} 
        render={true}
        renderAdd={true}
         />
      )}
    </LayOut>
  );
}

export default ProductDetail;
