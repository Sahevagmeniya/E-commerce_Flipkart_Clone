import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountCreated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(`/Login`), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[91vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold">🎉</h1>
        <h1 className="text-3xl font-bold text-green-600">
          Account Created Successfully!
        </h1>
        <p className="text-gray-500">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default AccountCreated;
