import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const OrderConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(`/`), 300000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[85.5vh] w-full flex items-center justify-center lg:h-[89vh]">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-7xl first-letter:ont-bold text-green-600 lg:text-9xl">
          <IoCheckmarkDoneCircle />
        </h1>
        <h1 className="text-xl font-bold lg:hidden">
          Congratulations🎉 Order Confirmed.
        </h1>
        <h1 className="text-xl font-bold pl-10 hidden lg:flex lg:text-4xl">
          Congratulations🎉Order Confirmed.
        </h1>
      </div>
    </div>
  );
};

export default OrderConfirmed;
