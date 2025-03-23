import React, { useContext, useState } from "react";
import styles from "./payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import ProductCard from "./../../components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false); // Add missing state
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Step 1: Request a payment intent from backend
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );

      const clientSecret = response?.data?.clientSecret;
      // console.log(clientSecret);

      if (!stripe || !elements) {
        console.error("Stripe.js has not loaded yet.");
        return;
      }

      // Step 2: Confirm payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);

      // Step 3: Save order to Firestore
      await setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
        {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      // Step 4: Clear basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/Orders", {
        state: { msg: "Your order has been placed successfully!" },
      });
    } catch (error) {
      console.error("Payment error:", error.message);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.Payment_header}>{/* checkout */}</div>
      {/* payment method */}
      <section className={styles.Payment}>
        {/* address */}
        <div className={styles.flex}>
          <h2>Delivery Address</h2>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={styles.flex}>
          <h2>Review items and delivery</h2>
          <div>
            {basket?.map((item, i) => (
              <ProductCard product={item} key={i} flex={true} cart={false} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={styles.flex}>
          <h2>Payment methods</h2>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_detail}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p> Total Order | </p>
                    <CurrencyFormat amount={total} />
                  </span>
                </div>
                <div>
                  <button disabled={processing}>
                    {processing ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
