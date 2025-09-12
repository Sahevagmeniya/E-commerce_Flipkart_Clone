import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleProduct = ({ singleProductData }) => {
  // home.jsx components me se yaha ek-ek product ka data laya hua he jo hume home page par dikhega
  let { image, title, price, id } = singleProductData;

  return (
    <Link
      to={`/Product/${id}`}
      className="h-[55vh] w-[22vw] rounded overflow-hidden text-center bg-zinc-100"
    >
      <div className="p-6 h-[65%] w-full">
        <img
          className="hover:scale-110 h-full w-full object-contain transition-transform"
          src={image}
          alt={`${title}'s image`}
        />
      </div>
      <h2 className="hover:text-blue-700 font-semibold my-3 transition-all">
        {title}
      </h2>
      <h2 className="flex justify-center items-center">
        <FaRupeeSign />
        {Math.round(price)}
      </h2>
    </Link>
  );
};

export default SingleProduct;
