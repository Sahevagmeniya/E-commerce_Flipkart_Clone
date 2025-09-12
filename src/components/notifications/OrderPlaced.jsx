import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../utility/Context";

const OrderPlaced = () => {
  const { loginUserData } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(
      () => navigate(`/Login/Profile/${loginUserData.fullName}/orders`),
      1000
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[91vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold">🎉</h1>
        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700">Thank you for shopping with us.</p>
        <p className="text-gray-500">Redirecting to your orders...</p>
      </div>
    </div>
  );
};

export default OrderPlaced;
