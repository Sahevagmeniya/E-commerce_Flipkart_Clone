import React, { useContext } from "react";
import { myContext } from "./Context";
import { Navigate } from "react-router-dom";

const IsLoginRoute = ({ children }) => {
  const { isLogin } = useContext(myContext);
  return isLogin ? children : <Navigate to="/Login" replace />; //replace previous page ko remove kar deta he
};

export default IsLoginRoute;
