import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { myContext } from "../../utility/Context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { usersData, setIsLogin, setLoginUserData } = useContext(myContext);

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const handleLogin = (loginData) => {
    const { loginEmail, loginPassword } = loginData;

    //Email & password authentication karane ki jarurat nahi he kyu ki login valid krane ke loginemail aur loginpassword authenticated email or password se match hoga to vo vaha se authenticated ho jayega or autheniticated nahi he to error dega

    const loginUser = usersData.find((elem) => elem.email === loginEmail);

    if (!loginUser) {
      setEmailError(
        "Email id not valid.(if you don't have account ? Please first create account)"
      );
      return;
    } else if (loginUser.password !== loginPassword) {
      setPasswordError("Incorrect password");
      return;
    } else {
      setLoginUserData(() => ({
        ...loginUser,
      }));

      reset();

      setPasswordError("");
      setEmailError("");

      setIsLogin(true);

      navigate("/Login/Login-Success");
    }
  };

  const inputClass =
    "peer w-full h-full outline-none pt-6 pb-2 border-b focus:border-b-blue-500";
  const lableClass =
    "absolute left-0 top-0 w-full text-sm text-zinc-500 pointer-events-none transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm";

  return (
    <div className="h-[75vh] w-[55vw] m-auto my-10 bg-zinc-100 flex items-center rounded overflow-hidden">
      <div className="left h-full w-[40%] bg-blue-500 text-white p-10">
        <h1 className="text-3xl font-semibold">Login</h1>
        <div className="font-semibold text-lg text-zinc-300 mt-6">
          <p>Get access to your Orders,</p>
          <p>Wishlist and Recommendations</p>
        </div>
        <img
          className="mt-[85%] ml-[8%]"
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="logo"
        />
      </div>
      <div className="right h-full w-[60%] p-10">
        <form onSubmit={handleSubmit((loginData) => handleLogin(loginData))}>
          {/* Email input start*/}
          <div className="relative w-full h-12">
            <input
              required //Blank input ko check karega
              {...register("loginEmail")}
              className={inputClass}
              placeholder=" "
              type="email"
              onFocus={() => setEmailError("")}
            />
            <label className={lableClass}>Enter Your Email</label>
          </div>
          {emailError && (
            <p className="text-red-500 font-semibold">{emailError}</p>
          )}
          {/* Password input start */}
          <div className="relative w-full h-12 mt-3">
            <input
              required
              {...register("loginPassword")}
              className={inputClass}
              placeholder=" "
              type="password"
              onFocus={() => setPasswordError("")}
            />
            <label className={lableClass}>Enter Your Password</label>
          </div>
          {passwordError && (
            <p className="text-red-500 font-semibold">{passwordError}</p>
          )}
          <button
            type="submit"
            className="hover:bg-amber-600 w-full mt-3.5 py-1.5 text-lg font-semibold rounded text-white bg-amber-500"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-2">
          <Link
            className="text-blue-800 hover:font-semibold"
            to={"/Login/Signup"}
          >
            New to Flipkart? Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
