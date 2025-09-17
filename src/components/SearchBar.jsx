import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { myContext } from "../utility/Context";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const { setSearch } = useContext(myContext);
  const { register, watch } = useForm();

  // reacr-hook-form ko use karake humane search me jo value aayegi use search variable me store karavaya he
  let searchProductValue = watch("searchProductValue");

  useEffect(() => {
    setSearch(searchProductValue);
  }, [searchProductValue]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="relative h-[8vw] w-[90%] mx-auto overflow-hidden lg:h-[2.6vw] lg:w-[50vw] lg:mx-0"
    >
      <CiSearch className="absolute top-0.5 left-1 text-2xl lg:size-7 lg:top-1.5" />
      <input
        {...register("searchProductValue")}
        className="bg-blue-100 pl-8 h-full w-full text-[2.2vh] rounded pt-1 outline-none lg:text-xl lg:pb-1 lg:pl-10"
        type="text"
        placeholder="Search for Products"
      />
    </form>
  );
};

export default SearchBar;
