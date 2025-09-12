import React, { useContext } from "react";
import { myContext } from "../../utility/Context";
import CartProduct from "./CartProduct";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { loginUserData, setLoginUserData, setUsersData, setOrderedProducts } =
    useContext(myContext);

  const { cartProducts } = loginUserData;

  const totalAmount = cartProducts.reduce((sum, elem) => {
    const price = Number(elem.price);
    const qty = Number(elem.qty);
    return sum + Math.round(price) * qty;
  }, 0);

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setOrderedProducts([...cartProducts]);
    setLoginUserData((prev) => ({ ...prev, cartProducts: [] }));
    setUsersData((prev) =>
      prev.map((elem) =>
        elem.email === loginUserData.email
          ? { ...elem, cartProducts: [] }
          : elem
      )
    );
    navigate("/Cart/Order-Placed-Notification");
  };

  const handleShopNowButton = () => {
    navigate("/");
  };

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-screen-lg mx-auto mt-10 bg-white h-[75vh] rounded flex flex-col items-center">
        <div className="h-[50%] w-[50%]">
          <img
            className="h-full w-full object-contain pt-22"
            src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
            alt="Add to cart logo"
          />
        </div>
        <h4 className="mt-3 text-xl font-[Inter] font-semibold">
          Your cart is empty!
        </h4>
        <p>Add items to it now.</p>
        <button
          onClick={handleShopNowButton}
          className="px-10 py-1 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
        >
          Shop now
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="h-[79vh] w-full overflow-y-auto">
        {cartProducts.map((elem) => (
          <CartProduct key={elem.id} cartProductDetails={elem} />
        ))}
      </div>
      <div className="w-full bg-white h-[11vh] rounded flex items-center justify-around px-25">
        <div className="flex items-center font-bold text-3xl">
          Total Order Amount :<FaRupeeSign className="ml-2 mr-0.5" />
          {/* toLocaleString("en-In") formate karati he amount ko*/}
          {Math.round(totalAmount).toLocaleString("en-In")}
        </div>
        <button
          onClick={handlePlaceOrder}
          className="transition-all hover:bg-amber-700 px-8 py-2 text-white bg-amber-500 rounded font-semibold text-xl uppercase"
        >
          place order
        </button>
      </div>
    </>
  );
};

export default Cart;
