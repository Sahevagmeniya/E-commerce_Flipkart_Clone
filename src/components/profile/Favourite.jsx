import React, { useContext } from "react";
import { myContext } from "../../utility/Context";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Favourite = () => {
  const { setLoginUserData, loginUserData } = useContext(myContext);

  const navigate = useNavigate();

  const removeFavListItem = (favListItemid) => {
    setLoginUserData((prev) => {
      return {
        ...prev,
        favList: prev.favList.filter((elem) => elem.id !== favListItemid),
      };
    });
  };

  const goToSingleProductDetails = (favProductid) => {
    navigate(`/Product/${favProductid}`);
  };

  const favouriteLinkClassName =
    "hover:bg-amber-500 hover:text-white hover:scale-102 transition-all bg-white rounded text-lg font-semibold flex justify-center gap-8 pt-3 w-full h-[13vh]";

  return (
    <div className="h-[85.5vh] w-full flex flex-wrap justify-center overflow-y-auto lg:h-[88vh]">
      <div className="w-full h-[13%] flex flex-col items-center pt-3">
        <div className="py-1 px-8 text-lg capitalize font-semibold bg-white mb-3 text-center rounded lg:px-10 lg:py-2">
          Hello ! {loginUserData.fullName}
        </div>
        <div className="py-1 px-7 text-lg rounded text-red-600 font-semibold bg-white flex items-center justify-center gap-2 lg:bg-zinc-50">
          Favourite List
          <FaHeart />
        </div>
      </div>
      <div className="h-full w-full mt-5 px-5 bg-zinc-50 lg:mt-7 lg:w-[60%] lg:h-[80%] lg:bg-zinc-300">
        {loginUserData.favList.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-45 lg:bg-zinc-50 lg:h-full lg:mt-0 lg:w-full lg:rounded">
            <img
              className="object-contain"
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
              alt="Favourite logo"
            />
            <p className="text-xl">Empty favourite list</p>
          </div>
        ) : (
          loginUserData.favList.map((elem) => (
            <div
              key={elem.id}
              className="h-[20vh] w-full rounded flex relative border mt-4 lg:h-[30vh] lg:w-full lg:mx-auto lg:bg-zinc-50 lg:border-none"
            >
              <MdDelete
                onClick={() => removeFavListItem(elem.id)}
                className="absolute text-xl top-2 right-2 hover:scale-110 lg:text-2xl"
              />
              <div className="h-full w-[30%]">
                <img
                  onClick={(id) => goToSingleProductDetails(elem.id)}
                  className="hover:scale-105 h-full w-full object-contain p-3 lg:p-5 transition-all"
                  src={elem.image}
                  alt={`${elem.title}'s image`}
                />
              </div>
              <div className="h-full w-[70%] pt-10 pl-3 text-lg leading-6 flex flex-col gap-4 lg:leading-normal lg:text-xl">
                <h2
                  onClick={(id) => goToSingleProductDetails(elem.id)}
                  className="hover:text-blue-800 line-clamp-2 lg:line-clamp-none"
                >
                  {elem.title}
                </h2>
                <div className="flex items-center font-semibold lg:text-2xl">
                  <FaRupeeSign />
                  <h1>{Math.round(elem.price)}</h1>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourite;
