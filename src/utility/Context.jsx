import React, { createContext, useEffect, useState } from "react";
import axios from "../utility/Axios";

export const myContext = createContext();

const Context = (props) => {
  const loadFromLocalStorage = (key, initialValue) => {
    const savedData = localStorage.getItem(key);
    if (!savedData || savedData === "undefined" || savedData === "null") {
      return initialValue;
    }
    try {
      const parsedData = JSON.parse(savedData);
      return parsedData ?? initialValue; // ?? undefined aur null ko check karata he varana pasrsed data return karata he
    } catch (error) {
      console.log(`error from ${key}`, error);
      return initialValue;
    }
  };

  const [search, setSearch] = useState(""); //Search bar ke liye search value
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [usersData, setUsersData] = useState(
    loadFromLocalStorage("usersData", [])
  );

  const [isLogin, setIsLogin] = useState(
    loadFromLocalStorage("isLogin", false)
  );

  const [loginUserData, setLoginUserData] = useState(
    loadFromLocalStorage("loginUserData", {})
  );

  const [orderedProducts, setOrderedProducts] = useState(
    loadFromLocalStorage("orderedProducts", [])
  );

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(
    loadFromLocalStorage("isAddressFormOpen", true)
  );

  const getProducts = () => {
    setLoading(true);
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => getProducts(), []);

  useEffect(() => {
    localStorage.setItem("usersData", JSON.stringify(usersData));
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
    localStorage.setItem("loginUserData", JSON.stringify(loginUserData));
    localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
    localStorage.setItem(
      "isAddressFormOpen",
      JSON.stringify(isAddressFormOpen)
    );
  }, [usersData, loginUserData, isLogin, orderedProducts, isAddressFormOpen]);

  return (
    <myContext.Provider
      value={{
        search,
        setSearch,
        products,
        getProducts,
        loading,
        usersData,
        setUsersData,
        isLogin,
        setIsLogin,
        loginUserData,
        setLoginUserData,
        orderedProducts,
        setOrderedProducts,
        isAddressFormOpen,
        setIsAddressFormOpen,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default Context;
