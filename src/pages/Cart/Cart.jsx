import { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import style from "./cart.module.css";

const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(basket);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={style.cart_container}>
        <div className={style.item_container}>
          <h2>hello</h2>
          <h3>your shopping basket </h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps ! No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section className={style.cart_product}>
                {" "}
                {/* Added key here */}
                <ProductCard
                  key={i}
                  product={item}
                  render={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={style.cart_addsub}>
                  <button className={style.btn} onClick={() => increment(item)}>
                    <IoIosArrowUp size={35} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={style.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={35} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={style.checkout_container}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payment">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
