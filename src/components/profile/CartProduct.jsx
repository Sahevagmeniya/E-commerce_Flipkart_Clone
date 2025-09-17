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
    <div className="w-full mt-2 bg-zinc-50 h-[26vh] flex items-center gap-5 lg:w-[75%] lg:mx-auto lg:h-[36vh] lg:rounded">
      <div className="h-full w-[40%] p-3.5">
        <img
          onClick={goToSingleProductDetails}
          className="transition-all cursor-pointer hover:scale-105 h-full w-full object-contain"
          src={image}
          alt={`${title}'s image`}
        />
      </div>
      <div className="h-full w-[60%] p-3 flex flex-col gap-2">
        <div>
          <h2
            onClick={goToSingleProductDetails}
            className="cursor-pointer hover:text-blue-800 line-clamp-2 leading-5 font-[Inter] transition-all lg:line-clamp-2 lg:text-2xl lg:leading-normal"
          >
            {title}
          </h2>
        </div>
        <h2 className="flex items-center text-xl font-semibold">
          <FaRupeeSign />
          {Math.round(price)}
        </h2>
        <div className="flex items-center gap-1.5">
          <CiCircleMinus
            onClick={cartQtyMinus}
            className="cursor-pointer text-3xl hover:text-blue-500 lg:text-4xl"
          />
          <span className="border h-7 font-bold px-3 text-center text-lg lg:3xl">
            {qty}
          </span>
          <CiCirclePlus
            onClick={cartQtyPlus}
            className="cursor-pointer text-3xl hover:text-blue-500 lg:text-4xl"
          />
        </div>
        <div className="flex items-center font-bold lg:text-xl">
          Total Price : <FaRupeeSign /> {Math.round(price) * qty}
        </div>
        <button
          onClick={handleRemoveCartProduct}
          className="uppercase px-4 py-1 w-fit bg-blue-600 rounded text-white transition-all font-semibold hover:bg-blue-700 text-sm lg:text-lg lg:px-7 lg:py-1.5"
        >
          Remove Product
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
