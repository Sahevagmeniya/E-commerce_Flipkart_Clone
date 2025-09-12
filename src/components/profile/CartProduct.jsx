import React, { useContext } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { myContext } from "../../utility/Context";
import { useNavigate } from "react-router-dom";

const CartProduct = ({ cartProductDetails }) => {
  const { image, title, price, qty, id } = cartProductDetails;

  const { setLoginUserData, setUsersData, loginUserData } =
    useContext(myContext);

  const cartQtyMinus = () => {
    setLoginUserData((prev) => ({
      ...prev,
      cartProducts: prev.cartProducts
        .map((elem) =>
          //hum ne cart me jis product ke minus button par click kiya he uski id cartProductDetails.id me he
          elem.id === cartProductDetails.id
            ? { ...elem, qty: elem.qty - 1 }
            : elem
        )
        // agar cart me product ki cart qty 0 ho jaye to vo cart se remove ho jayegi
        .filter((elem) => elem.qty > 0),
    }));

    setUsersData((prev) =>
      prev.map((elem) =>
        elem.email === loginUserData.email
          ? {
              ...elem,
              cartProducts: elem.cartProducts
                .map((elem) =>
                  elem.id === id ? { ...elem, qty: elem.qty - 1 } : elem
                )
                .filter((elem) => elem.qty > 0),
            }
          : elem
      )
    );
  };

  const cartQtyPlus = () => {
    setLoginUserData((prev) => ({
      ...prev,
      cartProducts: prev.cartProducts.map((elem) =>
        //hum ne cart me jis product ke plus button par click kiya he uski id cartProductDetails.id me he
        elem.id === cartProductDetails.id
          ? { ...elem, qty: elem.qty + 1 }
          : elem
      ),
    }));

    setUsersData((prev) =>
      prev.map((elem) =>
        elem.email === loginUserData.email
          ? {
              ...elem,
              cartProducts: elem.cartProducts
                .map((elem) =>
                  elem.id === id ? { ...elem, qty: elem.qty + 1 } : elem
                )
                .filter((elem) => elem.qty > 0),
            }
          : elem
      )
    );
  };

  const handleRemoveCartProduct = () => {
    setLoginUserData((prev) => ({
      ...prev,
      cartProducts: prev.cartProducts.filter((elem) => elem.id !== id),
    }));

    setUsersData((prev) =>
      prev.map((elem) =>
        elem.email === loginUserData.email
          ? {
              ...elem,
              cartProducts: elem.cartProducts.filter((elem) => elem.id !== id),
            }
          : elem
      )
    );
  };

  const navigate = useNavigate();

  const goToSingleProductDetails = () => {
    navigate(`/Product/${id}`);
  };

  return (
    <div className="mt-5 max-w-screen-lg mx-auto bg-zinc-100 h-[30vh] rounded overflow-hidden flex items-center gap-5">
      <div className="h-full w-[25%] rounded p-5">
        <img
          onClick={goToSingleProductDetails}
          className="transition-all cursor-pointer hover:scale-105 h-full w-full object-contain"
          src={image}
          alt={`${title}'s image`}
        />
      </div>
      <div className="h-full w-[75%] p-4">
        <h2
          onClick={goToSingleProductDetails}
          className="cursor-pointer hover:text-blue-800 text-2xl font-[Inter] transition-all mb-2"
        >
          {title}
        </h2>
        <h2 className="flex items-center text-xl mb-4">
          <FaRupeeSign />
          {Math.round(price)}
        </h2>
        <div className=" flex items-center gap-1.5 mb-3">
          <CiCircleMinus
            onClick={cartQtyMinus}
            className="cursor-pointer text-4xl hover:text-blue-500"
          />
          <span className="border h-8 w-auto  font-bold px-3 text-center text-xl">
            {qty}
          </span>
          <CiCirclePlus
            onClick={cartQtyPlus}
            className="cursor-pointer text-4xl hover:text-blue-500"
          />
        </div>
        <div className="flex items-center justify-between pr-5">
          <div className="text-2xl flex items-center font-semibold">
            Total Price : <FaRupeeSign /> {Math.round(price) * qty}
          </div>
          <button
            onClick={handleRemoveCartProduct}
            className="uppercase px-3 py-2 bg-blue-600 rounded text-white transition-all font-semibold hover:bg-blue-700 "
          >
            Remove Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
