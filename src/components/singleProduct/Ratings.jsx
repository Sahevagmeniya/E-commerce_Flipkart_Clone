import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ rating }) => {
  const rate = rating ? rating.rate : 0;
  const count = rating ? rating.count : 0;

  //exmpl.agar 4.3 he to 4 milega
  const fullStar = Math.floor(rate);

  //rate 4.3 he to 0.3 aayega jo 0.5 se chota he to halfStar false ayega
  const isHalfStar = rate - fullStar >= 0.5;

  const emptyStar = 5 - fullStar - (isHalfStar ? 1 : 0);

  return (
    <div className="text-xl mb-3 lg:text-2xl">
      Ratings:
      <div className="flex items-center text-2xl text-green-500 lg:text-3xl lg:mt-1.5">
        {/* full stars*/}
        {[...Array(fullStar)].map((elem, idx) => (
          <FaStar key={idx} />
        ))}

        {/* Half star (isHalfStar true hoga to half star render hoga agar false hoga to kuch render nahi hoga)*/}
        {isHalfStar && <FaStarHalfAlt />}

        {/* Empty star */}
        {[...Array(emptyStar)].map((elem, idx) => (
          <FaRegStar key={idx} />
        ))}

        <span className="text-lg ml-2 px-2 rounded flex items-center gap-1 bg-green-500 text-white lg:text-2xl">
          {rate.toFixed(1)} <FaStar />
        </span>
        <span className="text-black ml-1 text-lg lg:text-2xl">({count} Reviews)</span>
      </div>
    </div>
  );
};

export default Ratings;
