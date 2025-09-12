import React, { useContext, useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { myContext } from "../../utility/Context";
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { loginUserData, setLoginUserData, setUsersData } =
    useContext(myContext);

  const [processing, setProcessing] = useState(true);

  const deleteHistroy = (deleteId) => {
    setLoginUserData((prev) => ({
      ...prev,
      orderedHistory: prev.orderedHistory.filter(
        (elem) => elem.id !== deleteId
      ),
    }));

    setUsersData((prev) => {
      return prev.map((elem) =>
        elem.email === loginUserData.email
          ? {
              ...elem,
              orderedHistory: elem.orderedHistory.filter(
                (elem) => elem.id !== deleteId
              ),
            }
          : elem
      );
    });
  };

  const navigate = useNavigate();

  const handleShopNowButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => setProcessing(false), 5000);
    return clearTimeout(() => timer);
  }, []);

  return (
    <div className="h-[80vh] max-w-screen-xl mx-auto mt-10 rounded flex flex-wrap overflow-y-auto bg-zinc-100">
      {loginUserData.orderedHistory.length > 0 ? (
        loginUserData.orderedHistory.map((elem, idx) => (
          <div
            key={idx}
            className="h-[25vh] w-full mx-10 mt-5 flex border relative"
          >
            <MdDelete
              onClick={() => deleteHistroy(elem.id)}
              className="absolute text-2xl top-5.5 right-2 hover:scale-115 transition-all"
            />
            <div className="h-full w-[20%]">
              <img
                className="h-full w-full object-contain p-5"
                src={elem.image}
                alt={`${elem.title}'s image`}
              />
            </div>
            <div className="h-full w-[80%] flex">
              <div className="h-full w-[20%] pl-5 pt-5">{elem.title}</div>
              <div className="h-full w-[55%] pl-5 pt-5 tracking-tight">
                {elem.description}
              </div>
              <div className="h-full w-[25%] pl-5 flex flex-col justify-between items-center py-5 px-5">
                <h2
                  className={`${
                    processing ? "text-amber-600" : "text-green-500"
                  } flex items-center text-lg font-semibold`}
                >
                  <GoDotFill />
                  {processing ? "Processing..." : "Delivered"}
                </h2>
                <h3 className="flex items-center">
                  <FaRupeeSign />
                  {Math.round(elem.price)}
                </h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white h-full w-full rounded flex flex-col items-center">
          <div className="h-[50%] w-[50%]">
            <img
              className="h-full w-full object-contain pt-22"
              src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="Add to cart logo"
            />
          </div>
          <h4 className="mt-3 text-xl font-[Inter] font-semibold">
            No Shopping happened !
          </h4>
          <p className="mt-2">Go and Shop Now</p>
          <button
            onClick={handleShopNowButton}
            className="px-10 py-2 mt-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
          >
            Shop now
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
