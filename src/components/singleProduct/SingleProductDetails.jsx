import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { myContext } from "../../utility/Context";
import AddToCartButton from "./AddToCartButton";
import Ratings from "./Ratings";
import Loading from "../notifications/Loading";
import { IoMdHeart } from "react-icons/io";

const SingleProductDetails = () => {
  const { products, setLoginUserData, setUsersData, loginUserData, isLogin } =
    useContext(myContext);

  const navigate = useNavigate();

  // humane jo product pe click kiya he us product ki id milegi
  const { id } = useParams();

  if (!products || products.length === 0) {
    return <Loading />;
    //yaha pahele products ka load ho jana jaruri he varana products hi undefined aajayenge to aage ka data undefined milega
  }
  const singleProductOpenedData = products.find((elem) => {
    return elem.id === Number(id);
  }); //open hue product ka object return hoga.

  if (!singleProductOpenedData)
    return (
      <div className="flex justify-center items-center">
        <i className="text-3xl text-zinc-600 font-medium ">
          Product is not found.
        </i>
      </div>
    );

  const handleAddFav = () => {
    if (!isLogin) {
      alert("Login first");
      navigate("/Login");
      return;
    }

    setLoginUserData((prev) => {
      const favList = prev.favList;
      const isInFavList = favList.find(
        (elem) => elem.id === singleProductOpenedData.id
      );

      let newFavList = isInFavList
        ? favList.filter((elem) => elem.id !== singleProductOpenedData.id)
        : [...favList, singleProductOpenedData];

      setUsersData((users) =>
        users.map((user) =>
          user.email === prev.email ? { ...user, favList: newFavList } : user
        )
      );

      return {
        ...prev,
        favList: newFavList,
      };
    });
  };

  const goBack = () => {
    navigate("/");
  };

  const isInFavList = !loginUserData.favList
    ? false
    : loginUserData.favList.find(
        (elem) => elem.id === singleProductOpenedData.id
      );

  const { image, title, category, description, price, rating } =
    singleProductOpenedData;

  return (
    <div>
      {/* Mobile response*/}
      <div className="h-[50vh] w-full lg:hidden">
        <div className="h-full w-full relative bg-zinc-50">
          <IoMdHeart
            onClick={handleAddFav}
            className={`text-4xl absolute cursor-pointer top-2 right-3 transition-all ${
              isInFavList ? "text-red-500" : "text-zinc-300"
            }`}
          />
          <button
            onClick={goBack}
            title="Go Back"
            className="absolute transition-all cursor-pointer hover:scale-110 hover:bg-amber-600 px-3 py-1 bg-amber-500 text-white rounded text-xl top-13.5 right-2.5"
          >
            <RiArrowGoBackFill />
          </button>
          <div className="h-[85%] w-full p-8.5">
            <img
              className="hover:scale-105 h-full w-full object-contain transition-all"
              src={image}
              alt={`${title}'s image`}
            />
          </div>
          <AddToCartButton
            singleProductOpenedDetails={singleProductOpenedData}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-zinc-50 lg:hidden">
        <div className="w-full flex flex-col gap-2.5 p-3">
          <h2 className="capitalize">{category}</h2>
          <hr />
          <h1 className="font-semibold text-2xl font-[Inter] line-c">
            {title}
          </h1>
          <p className="text-lg leading-6">{description}</p>
          <h3 className="flex items-center text-3xl font-bold">
            <FaRupeeSign />
            {Math.round(price)}
          </h3>
          <Ratings rating={rating} />
        </div>
      </div>
      {/* Laptop response */}
      <div className="hidden h-[90vh] max-w-screen-xl mx-auto lg:flex justify-center items-center gap-3">
        <div className="left h-full w-[40%]  flex items-center justify-center">
          <div className="h-[85%] w-full bg-zinc-100 py-5 rounded-lg relative">
            <IoMdHeart
              onClick={handleAddFav}
              className={`text-5xl absolute cursor-pointer top-2 right-3 transition-all ${
                isInFavList ? "text-red-500" : "text-zinc-300"
              }`}
            />
            <div className="h-[80%] w-full p-8">
              <img
                className="hover:scale-105 h-full w-full object-contain transition-all"
                src={image}
                alt={`${title}'s image`}
              />
            </div>
            <AddToCartButton
              singleProductOpenedDetails={singleProductOpenedData}
            />
          </div>
        </div>
        <div className="right h-full w-[60%]  flex items-center justify-center">
          <div className="h-[85%] w-full bg-zinc-100 px-5 py-3.5 rounded-lg overflow-y-auto">
            <div className="w-full flex justify-end">
              <button
                onClick={goBack}
                title="Go Back"
                className="transition-all cursor-pointer hover:scale-110 hover:bg-amber-600 px-3 py-1 bg-amber-500 text-white rounded text-2xl"
              >
                <RiArrowGoBackFill />
              </button>
            </div>
            <h2 className="capitalize">{category}</h2>
            <hr className="mb-3 mt-1" />
            <h1 className="font-semibold text-3xl font-[Inter] mb-2">
              {title}
            </h1>
            <p className="text-xl ">{description}</p>
            <h3 className="flex items-center text-3xl mt-2 mb-2 font-bold">
              <FaRupeeSign />
              {Math.round(price)}
            </h3>
            <Ratings rating={rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
