import { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams} from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import style from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const { categoryName } = useParams();

  const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        // console.log(res);
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <div>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? 
          <Loader />
        : (
          <div className={style.products_container}>
            {results?.map((singleProduct,index) => (
              
                <ProductCard
                  key={index}
                  product={singleProduct}
                  render={false}
                  renderAdd={true}
                />
              
            ))}
          </div>
        )
        }
      </div>
    </LayOut>
  );
}

export default Results;
