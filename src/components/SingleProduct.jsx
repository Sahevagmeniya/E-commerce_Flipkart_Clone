import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleProduct = ({ singleProductData }) => {
  // home.jsx components me se yaha ek-ek product ka data laya hua he jo hume home page par dikhega
  let { image, title, price, id } = singleProductData;

  return (
    <Link
      to={`/Product/${id}`}
      className="h-[30vh] w-[45vw] rounded overflow-hidden text-center bg-zinc-100 px-3 lg:h-[55vh] lg:w-[22vw] lg:px-0"
    >
      <div className="p-2.5 h-[65%] w-full lg:h-[70%] lg:p-4">
        <img
          className="hover:scale-105 h-full w-full object-contain transition-transform"
          src={image}
          alt={`${title}'s image`}
        />
      </div>
      <h2 className="hover:text-blue-700 my-1.5 text-sm transition-all line-clamp-2 lg:text-lg lg:px-2.5">
        {title}
      </h2>
      <h2 className="flex justify-center items-center font-semibold mb-1.5 lg:text-xl">
        <FaRupeeSign />
        {Math.round(price)}
      </h2>
    </Link>
  );
};

export default SingleProduct;
