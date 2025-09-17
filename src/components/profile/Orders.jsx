import React, { useContext } from "react";
import { myContext } from "../../utility/Context";
import { MdOutlineDone } from "react-icons/md";
import AddressDetails from "./AddressDetails";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const {
    loginUserData,
    setLoginUserData,
    setUsersData,
    usersData,
    orderedProducts,
    setOrderedProducts,
    isAddressFormOpen,
  } = useContext(myContext);

  const navigate = useNavigate();

  const totalPayableAmount = () =>
    orderedProducts.reduce(
      (sum, elem) => sum + Math.round(elem.price) * elem.qty,
      0
    );

  const handleConfirmOrder = () => {
    setLoginUserData((prev) => {
      const orderedHistory = prev.orderedHistory;
      return {
        ...prev,
        orderedHistory: [...orderedHistory, ...orderedProducts],
      };
    });

    setUsersData((prev) => {
      const orderedHistory = loginUserData.orderedHistory;
      return usersData.map((elem) => {
        return elem.email === loginUserData.email
          ? { ...elem, orderedHistory: [...orderedHistory, ...orderedProducts] }
          : elem;
      });
    });

    navigate(`/Login/Profile/${loginUserData.fullName}/orders/order-completed`);
    setOrderedProducts([]);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const handleRemove = (clickedId) =>
    setOrderedProducts((prev) => prev.filter((elem) => elem.id !== clickedId));

  return (
    <div className="w-full mt-3 lg:w-[75vw] lg:mx-auto lg:mt-5 lg:h-[45vh]">
      {/* Login details */}
      <div className="w-full h-[6vh] bg-zinc-100 flex items-center px-5 justify-between lg:h-[8vh] lg:rounded">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-zinc-300 text-blue-500 rounded lg:font-semibold">
            1
          </span>
          <div className="text-lg uppercase font-semibold text-zinc-500 lg:text-xl">
            Login
          </div>
          <span>
            <MdOutlineDone className="text-xl text-blue-500 lg:text-3xl" />
          </span>
        </div>
        <div className="lg:text-xl">{loginUserData.email}</div>
      </div>
      <AddressDetails />
      {/* Order summary */}
      <div
        className={`${
          isAddressFormOpen ? "bg-zinc-100" : "bg-blue-500"
        } h-[6vh] w-full mt-3 flex items-center lg:h-[8vh] lg:rounded-t`}
      >
        <div className="px-5">
          <div className="flex items-center gap-3">
            <span
              className={`${
                isAddressFormOpen ? "bg-zinc-300" : "bg-zinc-100"
              } px-2 py-0.5 text-blue-500 rounded lg:font-semibold`}
            >
              3
            </span>
            <div
              className={`text-lg lg:text-xl uppercase font-semibold ${
                isAddressFormOpen ? "text-zinc-500" : "text-white"
              }`}
            >
              order summary
            </div>
          </div>
        </div>
      </div>

      {!isAddressFormOpen && orderedProducts.length > 0 ? (
        <div className="w-full lg:h-full lg:overflow-y-auto lg:rounded-b">
          {orderedProducts.map((elem) => (
            <div key={elem.id} className="h-[28vh] w-full p-5 flex bg-zinc-100">
              <div className="h-full w-[40%]">
                <img
                  className="h-full w-full object-contain"
                  src={elem.image}
                  alt={`${elem.title}'s image`}
                />
              </div>
              <div className="w-full flex flex-col gap-2 pl-8 py-3">
                <div>
                  <h2 className="line-clamp-2 tracking-tight leading-5.5 text-lg">
                    {elem.title}
                  </h2>
                </div>
                <h3>Qty: {elem.qty}</h3>
                <h1 className="text-xl flex items-center gap-2">
                  <FaRupeeSign />
                  {Math.round(elem.price)}
                </h1>
                <div>
                  <button
                    onClick={() => handleRemove(elem.id)}
                    className="hover:bg-amber-600 px-10 py-1 bg-amber-500 rounded text-white transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full bg-zinc-50 lg:rounded-b">
            <h2 className="uppercase text-zinc-500 text-3xl font-semibold py-2 text-center border-y">
              price details
            </h2>
            <div className="flex py-5 pl-5 pr-15 items-center justify-between text-2xl lg:justify-around">
              <h1>{`Price (${orderedProducts.length} items) :`}</h1>
              <div className="flex items-center">
                <FaRupeeSign />
                <h1 className="font-semibold">
                  {Math.round(totalPayableAmount())}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="capitalize font-bold text-2xl border-b-2 pb-1.5">
                Total payable amount
              </h1>
            </div>
            <div className="flex items-center text-2xl justify-center mt-1.5">
              <FaRupeeSign />
              <h1 className="font-bold">{Math.round(totalPayableAmount())}</h1>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleConfirmOrder}
                className="px-10 py-2 mt-4 mb-5 bg-amber-600 rounded text-lg font-semibold text-white uppercase hover:bg-amber-700 transition-all"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        !isAddressFormOpen && (
          <div className="h-[50vh] bg-white rounded-b flex flex-col items-center justify-center lg:h-full">
            <div className="h-[50%] w-full">
              <img
                className="h-full w-full object-contain"
                src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                alt="Add to cart logo"
              />
            </div>
            <h4 className="mt-3 text-xl font-[Inter] font-semibold">
              No orders Founds.
            </h4>
            <button
              onClick={goToHomePage}
              className="lg:font-semibold px-10 py-2 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
            >
              Shop now
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Orders;
