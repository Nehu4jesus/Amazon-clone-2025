
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Orders from "./Pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail  from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/Payment/Payment";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";  
const stripePromise = loadStripe(
  "pk_test_51R2bSfE2Cv8LxcKq7aKiaw3EQBwLnpPjJN7olPESHqX2qPg9dPcf3N7iy0hkeJBa8mXKZkBrIVTTF8TM81eCgm5s00GgmQawTr"
);

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"Please Login to Continue with payment"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"Please Login to Continue your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routing;