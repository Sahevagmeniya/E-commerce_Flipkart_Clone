import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { myContext } from "../../utility/Context";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const AddToCartButton = ({ singleProductOpenedDetails }) => {
  const { isLogin, loginUserData, setLoginUserData, setUsersData } =
    useContext(myContext);

  const { cartProducts } = loginUserData;

  const navigate = useNavigate();

  const addToCartHandle = () => {
    //ye function run hua he to cartProducts definatly [] aayega isi liye yaha humane undefined of null check nahi kiya.
    const isInCart = cartProducts.find(
      (elem) => elem.id === singleProductOpenedDetails.id
    );
    let newCart = [];
    if (!isInCart) {
      newCart = [...cartProducts, { ...singleProductOpenedDetails, qty: 1 }];
    }

    setLoginUserData((prev) => ({
      ...prev,
      cartProducts: newCart,
    }));

    setUsersData((prev) =>
      prev.map((elem) =>
        elem.email === loginUserData.email
          ? { ...elem, cartProducts: newCart }
          : elem
      )
    );
  };

  const goToCartHandle = () => {
    navigate("/Cart");
  };

  const isInCart = !cartProducts
    ? false
    : cartProducts.find((elem) => elem.id === singleProductOpenedDetails.id);

  return (
    <div className="h-[20%] w-full  flex justify-center items-center">
      {
        <button
          onClick={() => {
            if (isLogin) {
              isInCart ? goToCartHandle() : addToCartHandle();
            } else {
              alert("For adding products in Cart first you has to Login");
              return navigate("/Login");
            }
          }}
          className="cursor-pointer transition-transform hover:scale-105 hover:bg-amber-600 select-none uppercase flex items-center justify-center gap-2 py-3 px-5 bg-amber-500 rounded font-bold text-white"
        >
          {isInCart ? (
            <FaCartShopping className="text-xl" />
          ) : (
            <FaCartPlus className="text-xl" />
          )}
          {isInCart ? "Go to Cart" : "Add to Cart"}
        </button>
      }
    </div>
  );
};

export default AddToCartButton;
