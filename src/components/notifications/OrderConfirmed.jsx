import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const OrderConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(`/`), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[91vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-9xl first-letter:ont-bold text-green-600">
          <IoCheckmarkDoneCircle />
        </h1>
        <h1 className="text-3xl font-bold pl-10">
          Congratulations🎉Order Confirmed.
        </h1>
      </div>
    </div>
  );
};

export default OrderConfirmed;
