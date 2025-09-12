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
    <div className="max-w-screen-xl mx-auto mt-5 rounded h-[85vh] overflow-hidden">
      {/* Login details */}
      <div className="w-full h-[8vh] bg-zinc-100 rounded flex items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-zinc-300 text-blue-500 rounded">
            1
          </span>
          <div className="text-xl uppercase font-semibold text-zinc-500">
            Login
          </div>
          <span>
            <MdOutlineDone className="text-2xl text-blue-500" />
          </span>
        </div>
        <div className="text-lg">{loginUserData.email}</div>
      </div>
      <AddressDetails />
      {/* Order summary */}
      <div
        className={`${isAddressFormOpen ? "bg-zinc-100" : "bg-blue-500"} ${
          isAddressFormOpen && "rounded"
        } h-[8vh] max-w-screen-xl mt-2 rounded-t flex items-center`}
      >
        <div className="px-4">
          <div className="flex items-center gap-3">
            <span
              className={`${
                isAddressFormOpen ? "bg-zinc-300" : "bg-zinc-100"
              } px-2 py-0.5 text-blue-500 rounded`}
            >
              3
            </span>
            <div
              className={`text-xl uppercase font-semibold ${
                isAddressFormOpen ? "text-zinc-500" : "text-white"
              }`}
            >
              order summary
            </div>
          </div>
        </div>
      </div>

      {!isAddressFormOpen && orderedProducts.length > 0 ? (
        <div className={`max-w-screen-xl mx-auto h-[48vh] flex gap-5`}>
          <div className="h-full w-[65%] flex flex-wrap overflow-y-auto bg-zinc-100 rounded-b">
            {orderedProducts.map((elem) => (
              <div key={elem.id} className="h-full w-full p-10 flex">
                <div className="h-full w-[40%]">
                  <img
                    className="h-full w-full object-contain"
                    src={elem.image}
                    alt={`${elem.title}'s image`}
                  />
                </div>
                <div className="text-2xl tracking-tight w-full p-5 flex flex-col gap-4 pl-15">
                  <h2>{elem.title}</h2>
                  <h3>Qty: {elem.qty}</h3>
                  <h1 className="text-3xl flex items-center gap-2">
                    <FaRupeeSign />
                    {Math.round(elem.price)}
                  </h1>
                  <div>
                    <button
                      onClick={() => handleRemove(elem.id)}
                      className="hover:bg-amber-600 px-10 py-2 bg-amber-500 rounded text-white transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-full w-[35%] bg-zinc-100">
            <h2 className="uppercase text-zinc-500 text-3xl font-semibold px-5 pt-5 pb-2 border-b">
              price details
            </h2>
            <div className="flex py-5 pl-5 pr-15 items-center justify-between text-2xl ">
              <h1>{`Price (${orderedProducts.length} items) :`}</h1>
              <div className="flex items-center">
                <FaRupeeSign />
                <h1 className="font-semibold">
                  {Math.round(totalPayableAmount())}
                </h1>
              </div>
            </div>
            <div className="flex py-5 pl-5 pr-15 items-center justify-between text-2xl ">
              <h1 className="capitalize font-bold">Total payable amount :</h1>
              <div className="flex items-center">
                <FaRupeeSign />
                <h1 className="font-bold">
                  {Math.round(totalPayableAmount())}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleConfirmOrder}
                className="px-10 py-2 mt-5 bg-amber-600 rounded text-lg font-semibold text-white uppercase hover:bg-amber-700 transition-all"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        !isAddressFormOpen && (
          <div className="max-w-screen-xl h-[40vh] bg-white rounded-b flex flex-col items-center justify-center">
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
              className="px-10 py-2 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
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
