import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountCreated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(`/Login`), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[85.5vh] w-full flex items-center justify-center lg:h-[89vh]">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold lg:text-5xl">🎉</h1>
        <h1 className="text-3xl font-bold text-green-600 lg:text-4xl">
          Account Created Successfully!
        </h1>
        <p className="text-gray-500 lg:text-lg">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default AccountCreated;
