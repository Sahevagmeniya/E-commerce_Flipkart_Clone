import React, { useContext } from "react";
import { myContext } from "../../utility/Context";
import { SiFlipkart } from "react-icons/si";
import { FaCartArrowDown, FaHistory } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Favourite = () => {
  const { setLoginUserData, loginUserData, setIsLogin, setOrderedProducts } =
    useContext(myContext);

  const navigate = useNavigate();

  const handleLogoutButton = () => {
    const userConfirmation = confirm("Are you sure you want to logout ?");
    if (userConfirmation) {
      setIsLogin(false);
      setLoginUserData({ cartProducts: [], favList: [], addressData: {} });
      navigate("/Login");
      setOrderedProducts([]);
    }
  };

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
    <div className="flex">
      <div className="h-[75vh] w-[23vw] ml-5 mt-5 rounded">
        <div className="w-full flex flex-col items-center">
          <div className="py-3 w-full text-xl capitalize font-semibold bg-white mb-3 text-center rounded">
            Hello ! {loginUserData.fullName}
          </div>
          <div className="w-full py-3 text-xl rounded font-semibold bg-white text-center">
            {loginUserData.email}
          </div>
        </div>
        <div className="flex gap-3 flex-wrap justify-center mt-3">
          <Link
            to={`/Login/Profile/${loginUserData.fullName}/orders`}
            className={favouriteLinkClassName}
          >
            My Orders
            <SiFlipkart className="text-7xl" />
          </Link>
          <Link to={"/Cart"} className={favouriteLinkClassName}>
            My Cart
            <FaCartArrowDown className="text-7xl" />
          </Link>
          <Link
            to={"/Login/Profile/:fullName/favourite"}
            className={favouriteLinkClassName}
          >
            Favourite
            <MdFavoriteBorder className="text-7xl" />
          </Link>
          <Link
            to={"/Login/Profile/:fullName/orders-history"}
            className={favouriteLinkClassName}
          >
            Orders History
            <FaHistory className="text-7xl" />
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleLogoutButton}
            className="flex items-center justify-center gap-2 hover:scale-105 hover:bg-amber-600 mt-5 px-4 py-2 bg-amber-500 rounded text-white text-lg font-semibold"
          >
            <RiShutDownLine />
            Logout
          </button>
        </div>
      </div>
      <div className="h-[75vh] w-[70vw] ml-5 mt-5 flex flex-wrap justify-center rounded overflow-y-auto bg-zinc-100">
        {loginUserData.favList.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
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
              className="h-[25vh] w-[95%] rounded flex relative border mt-5"
            >
              <MdDelete
                onClick={() => removeFavListItem(elem.id)}
                className="absolute text-3xl top-2 right-2 hover:scale-110"
              />
              <div className="h-full w-[20%]">
                <img
                  onClick={(id) => goToSingleProductDetails(elem.id)}
                  className="hover:scale-105 h-full w-full object-contain p-3.5"
                  src={elem.image}
                  alt={`${elem.title}'s image`}
                />
              </div>
              <div className="w-[70%] pt-10 pl-3 text-xl flex flex-col gap-5">
                <h2
                  onClick={(id) => goToSingleProductDetails(elem.id)}
                  className="hover:text-blue-800"
                >
                  {elem.title}
                </h2>
                <div className="flex items-center font-semibold">
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
