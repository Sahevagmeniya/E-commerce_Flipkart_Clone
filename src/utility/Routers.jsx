import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Cart from "../components/profile/Cart";
import Login from "../components/Authentication/Login";
import SingleProductDetails from "../components/singleProduct/SingleProductDetails";
import Signup from "../components/Authentication/Signup";
import Profile from "../components/profile/Profile";
import Favourite from "../components/profile/Favourite";
import Orders from "../components/profile/Orders";
import IsLoginRoute from "./IsLoginRoute";
import OrderPlaced from "../components/notifications/OrderPlaced";
import AccountCreated from "../components/notifications/AccountCreated";
import LoginSuccess from "../components/notifications/LoginSuccess";
import OrderConfirmed from "../components/notifications/OrderConfirmed";
import OrderHistory from "../components/profile/OrdersHistory";

const Routers = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Product/:id" element={<SingleProductDetails />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Login/Signup" element={<Signup />} />

      {/* Notification pages */}
      <Route
        path="/Login/Signup/Account-Created"
        element={<AccountCreated />}
      />
      <Route path="/Login/Login-Success" element={<LoginSuccess />} />
      <Route path="/Cart/Order-Placed-Notification" element={<OrderPlaced />} />
      <Route
        path="/Login/Profile/:fullName/orders/order-completed"
        element={<OrderConfirmed />}
      />

      {/* Private routes (not open without login) */}
      <Route
        path="/Login/Profile/:fullName"
        element={
          <IsLoginRoute>
            <Profile />
          </IsLoginRoute>
        }
      />

      <Route
        path="/Cart"
        element={
          <IsLoginRoute>
            <Cart />
          </IsLoginRoute>
        }
      />

      <Route
        path="/Login/Profile/:fullName/favourite"
        element={
          <IsLoginRoute>
            <Favourite />
          </IsLoginRoute>
        }
      />
      <Route
        path="/Login/Profile/:fullName/orders-history"
        element={
          <IsLoginRoute>
            <OrderHistory />
          </IsLoginRoute>
        }
      />
      <Route
        path="/Login/Profile/:fullName/orders"
        element={
          <IsLoginRoute>
            <Orders />
          </IsLoginRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
