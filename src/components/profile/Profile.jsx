import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../../utility/Context";
import { MdFavoriteBorder } from "react-icons/md";
import { SiFlipkart } from "react-icons/si";
import { FaCartArrowDown, FaHistory } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";

const Profile = () => {
  const {
    setLoginUserData,
    loginUserData,
    setIsLogin,
    setOrderedProducts,
  } = useContext(myContext);

  const { fullName, email } = loginUserData;

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

  const linkClassName =
    "hover:scale-105 hover:bg-amber-500 hover:text-white transition-all bg-white rounded text-lg font-semibold flex justify-center gap-8 p-5 w-[20vw] h-[15vh]";

  return (
    <div className="h-[75vh] w-[55vw] m-auto my-10 rounded overflow-hidden">
      <div className="w-full flex flex-col items-center">
        <div className="py-3 px-10 text-xl capitalize font-semibold bg-white mb-2 text-center rounded">
          Hello ! {fullName}
        </div>
        <div className="mt-2 py-3 px-10 rounded font-semibold bg-white text-center">
          {email}
        </div>
      </div>
      <div className="flex gap-5  flex-wrap justify-center mt-5">
        <Link
          to={`/Login/Profile/${fullName}/orders`}
          className={linkClassName}
        >
          My Orders
          <SiFlipkart className="text-7xl" />
        </Link>
        <Link to={"/Cart"} className={linkClassName}>
          My Cart
          <FaCartArrowDown className="text-7xl" />
        </Link>
        <Link
          to={"/Login/Profile/:fullName/favourite"}
          className={linkClassName}
        >
          Favourite
          <MdFavoriteBorder className="text-7xl" />
        </Link>
        <Link
          to={"/Login/Profile/:fullName/orders-history"}
          className={linkClassName}
        >
          Orders History
          <FaHistory className="text-7xl" />
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleLogoutButton}
          className="flex items-center justify-center gap-2 hover:scale-105 hover:bg-amber-600 mt-8 px-4 py-2 bg-amber-500 rounded text-white text-lg font-semibold transition-all"
        >
          <RiShutDownLine />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
