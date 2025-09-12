import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { myContext } from "../utility/Context";

const Navbar = () => {
  let { setSearch, isLogin, loginUserData } = useContext(myContext);

  // reacr-hook-form ko use karake humane search me jo value aayegi use search variable me store karavaya he
  const { register, watch } = useForm();

  let searchProductValue = watch("searchProductValue");

  useEffect(() => {
    setSearch(searchProductValue);
  }, [searchProductValue]);

  return (
    <nav className="h-[9vh] w-full bg-zinc-100 flex items-center gap-15 px-25">
      {/* Flipkart Logo */}
      <Link to="/">
        <img
          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
          alt="Flipcart explore plus logo"
        />
      </Link>
      {/* Search-bar */}
      <form className="relative h-[2.6vw] w-[50vw] overflow-hidden">
        <CiSearch className="absolute top-[18%] left-[1.5%] size-6" />
        <input
          {...register("searchProductValue")}
          className="bg-blue-100 pl-12 h-full w-full text-[2.7vh] rounded"
          type="text"
          placeholder="Search for Products"
        />
      </form>
      {/* Cart Link */}
      <Link
        onClick={() => !isLogin && alert("For using Cart you has to Login")}
        to="/Cart"
        className="flex items-center gap-2 text-[1.3vw]"
      >
        <BsCart3 className="size-[2vw]" />
        Cart
      </Link>
      {/* Login & Profile Link */}
      {isLogin ? (
        <Link
          to={`/Login/Profile/${loginUserData.fullName}`}
          className={`transition-all flex items-center gap-2 border rounded w-fit text-nowrap hover:bg-blue-500 hover:text-white px-3 py-1 ${
            isLogin ? "text-[1vw] font-semibold" : "[1.3vw]"
          }`}
        >
          <IoPersonCircleOutline className="size-[2vw]" />
          {loginUserData.fullName}
        </Link>
      ) : (
        <Link to="/Login" className="flex items-center gap-2 text-[1.3vw]">
          <IoPersonCircleOutline className="size-[2vw]" />
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
