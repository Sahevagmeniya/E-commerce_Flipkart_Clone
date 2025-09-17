import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../../utility/Context";

const Signup = () => {
  const [signUpFullNameError, setSignUpFullNameError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState([]);
  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] =
    useState("");
  const { setUsersData } = useContext(myContext);

  const fullNameRegix = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegix =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const handleSignUp = (signUpData) => {
    const {
      signUpFullName,
      signUpEmail,
      signUpPassword,
      signUpConfirmPassword,
    } = signUpData;

    let isSignUpValid = true;

    if (!fullNameRegix.test(signUpFullName)) {
      setSignUpFullNameError(
        "Only alphabets allowed & cannot start or end with spaces."
      );
      isSignUpValid = false;
      return;
    }

    if (!emailRegix.test(signUpEmail)) {
      setSignUpEmailError("Please enter a valid email address");
      isSignUpValid = false;
      return;
    }

    if (!passwordRegix.test(signUpPassword)) {
      setSignUpPasswordError(() => [
        "Your password should contain below:",
        "• Minimum 1 capital letter.",
        "• Minimum 1 small letter.",
        "• One number & one special character (@ $ ! % * ? &).",
        "• Minimum 8 characters.",
      ]);
      isSignUpValid = false;
      return;
    }

    if (signUpConfirmPassword !== signUpPassword) {
      setSignUpConfirmPasswordError("Entered both password must be same.");
      isSignUpValid = false;
      return;
    }

    if (isSignUpValid) {
      setUsersData((prev) => [
        ...prev,
        {
          fullName: signUpFullName,
          email: signUpEmail,
          password: signUpPassword,
          cartProducts: [],
          favList: [],
          orderedHistory: [],
          addressData: {},
        },
      ]);

      reset();

      setSignUpFullNameError("");
      setSignUpEmailError("");
      setSignUpPasswordError([]);
      setSignUpConfirmPasswordError("");
      navigate("/Login/Signup/Account-Created");
    }
  };

  const inputClass =
    "peer w-full h-full outline-none pt-6 pb-2 border-b focus:border-b-blue-500";
  const lableClass =
    "absolute left-0 top-0 w-full text-sm text-zinc-500 pointer-events-none transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm";
  const errorClass = "text-red-500 font-semibold text-sm";

  return (
    <div className="h-[85.5vh] w-full bg-zinc-100">
      <div className="h-[45%] w-full bg-blue-500 text-white p-5 flex flex-col gap-7">
        <h1 className="text-2xl font-semibold">
          <p>Looks like</p>
          <p> you're new here!</p>
        </h1>
        <div className="font-semibold text-zinc-300">
          <p>Sign up with your email id to</p>
          <p> get started</p>
        </div>
        <img
          className="h-25 w-40 object-contain"
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="Logo"
        />
      </div>
      <div className="h-[50%] w-full px-8 py-5">
        <form onSubmit={handleSubmit((signUpData) => handleSignUp(signUpData))}>
          {/* Full Name input start */}
          <div className="relative w-full h-12">
            <input
              required //Blank input ko check karega
              {...register("signUpFullName")}
              className={inputClass}
              placeholder=" "
              type="text"
              onFocus={() => setSignUpFullNameError("")}
            />
            <label className={lableClass}>Enter Your Full Name</label>
          </div>
          {signUpFullNameError && (
            <p className={errorClass}>{signUpFullNameError}</p>
          )}
          {/* Email input start */}
          <div className="relative w-full h-12 mt-3">
            <input
              required
              {...register("signUpEmail")}
              className={inputClass}
              placeholder=" "
              type="email"
              onFocus={() => setSignUpEmailError("")}
            />
            <label className={lableClass}>Enter Your Email</label>
          </div>
          {signUpEmailError && <p className={errorClass}>{signUpEmailError}</p>}
          {/* Password input start */}
          <div className="relative w-full h-12 mt-3">
            <input
              required
              {...register("signUpPassword")}
              className={inputClass}
              placeholder=" "
              type="password"
              onFocus={() => setSignUpPasswordError([])}
            />
            <label className={lableClass}>Enter Your New Password</label>
          </div>
          {signUpPasswordError && (
            <ul className={errorClass}>
              {signUpPasswordError.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
          {/* Confirm password input start */}
          <div className="relative w-full h-12 mt-3">
            <input
              required
              {...register("signUpConfirmPassword")}
              className={inputClass}
              placeholder=" "
              type="password"
              onFocus={() => setSignUpConfirmPasswordError("")}
            />
            <label className={lableClass}>Confirm Your New Password</label>
          </div>
          {signUpConfirmPasswordError && (
            <p className={errorClass}>{signUpConfirmPasswordError}</p>
          )}

          <button
            type="submit"
            className="hover:bg-amber-600 w-full mt-3.5 py-1.5 text-lg font-semibold rounded text-white bg-amber-500"
          >
            Create Account
          </button>
        </form>
        <div className="flex items-center justify-center mt-2">
          <Link className="text-blue-800 hover:font-semibold" to={"/Login"}>
            Exsiting User? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
