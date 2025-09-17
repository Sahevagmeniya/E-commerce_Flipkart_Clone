import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { myContext } from "../utility/Context";
import SearchBar from "./SearchBar";

const Navbar = () => {
  let { isLogin, loginUserData } = useContext(myContext);

  return (
    <nav className="w-full h-[14.5vh] gap-4 bg-white flex flex-col lg:flex-row lg:h-[10vh] lg:items-center lg:justify-around lg:gap-0 lg:pr-16">
      {/* mobile ke liye */}
      <div className="flex items-center justify-between pt-4 lg:pt-0 lg:hidden">
        {/* Flipkart Logo */}
        <Link className="ml-[-46px] lg:ml-0" to="/">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
            alt="Flipcart explore plus logo"
          />
        </Link>
        <div className="flex items-center gap-5">
          {/* Cart Link */}
          <Link
            onClick={() => !isLogin && alert("For using Cart you has to Login")}
            to="/Cart"
            className="text-[5.5vw]"
          >
            <BsCart3 className="size-[7vw]" />
          </Link>

          {/* Login & Profile Link */}
          {isLogin ? (
            <Link
              to={`/Login/Profile/${loginUserData.fullName}`}
              className={`transition-all flex items-center gap-1 border rounded w-fit text-nowrap hover:bg-blue-500 hover:text-white px-2.5 mr-5 ${
                isLogin && "text-[5.5vw] font-semibold"
              }`}
            >
              <IoPersonCircleOutline className="size-[6.5vw]" />
              {loginUserData.fullName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </Link>
          ) : (
            <Link
              to="/Login"
              className="flex items-center gap-2 text-[5.5vw] mr-5"
            >
              <IoPersonCircleOutline className="size-[6.5vw]" />
              Login
            </Link>
          )}
        </div>
      </div>
      {/* Search-bar */}
      <div className="lg:hidden">
        <SearchBar />
      </div>
      {/* Laptop ke liye */}
      {/* Flipkart Logo */}
      <Link className="hidden lg:flex justify-center items-center" to="/">
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
          alt="Flipcart explore plus logo"
        />
      </Link>
      {/* Search-bar */}
      <div className="hidden lg:flex">
        <SearchBar />
      </div>
      {/* Cart Link */}
      <Link
        onClick={() => !isLogin && alert("For using Cart you has to Login")}
        to="/Cart"
        className="hidden lg:flex items-center gap-2 text-[1.3vw]"
      >
        <BsCart3 className="size-[2vw]" />
        Cart
      </Link>
      {/* Login & Profile Link */}
      {isLogin ? (
        <Link
          to={`/Login/Profile/${loginUserData.fullName}`}
          className={`hidden lg:flex transition-all items-center gap-2 border rounded w-fit text-nowrap hover:bg-blue-500 hover:text-white px-3 py-1 ${
            isLogin ? "text-[1vw] font-semibold" : "[1.3vw]"
          }`}
        >
          <IoPersonCircleOutline className="size-[2vw]" />
          {loginUserData.fullName}
        </Link>
      ) : (
        <Link
          to="/Login"
          className="hidden lg:flex items-center gap-2 text-[1.3vw]"
        >
          <IoPersonCircleOutline className="size-[2vw]" />
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
