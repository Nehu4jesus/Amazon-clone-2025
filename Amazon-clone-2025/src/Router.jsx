import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Orders from "./Pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail  from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51R2bSfE2Cv8LxcKq7aKiaw3EQBwLnpPjJN7olPESHqX2qPg9dPcf3N7iy0hkeJBa8mXKZkBrIVTTF8TM81eCgm5s00GgmQawTr"
);

function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise} >
                <Payment />
              </Elements>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
