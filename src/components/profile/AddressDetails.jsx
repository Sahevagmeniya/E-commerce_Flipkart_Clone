import React, { useContext, useState } from "react";
import { myContext } from "../../utility/Context";
import { MdOutlineDone } from "react-icons/md";
import { useForm } from "react-hook-form";

const AddressDetails = () => {
  const {
    isAddressFormOpen,
    setIsAddressFormOpen,
    loginUserData,
    setLoginUserData,
    setUsersData,
  } = useContext(myContext);

  const [addressFormErrors, setAddressFormErrors] = useState({});

  const { register, handleSubmit, reset } = useForm();

  const nameRegix = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const mobileNumberRegix = /^[6-9]\d{9}$/;
  const pincodeRegix = /^[1-9][0-9]{5}$/;
  const cityAndStateRegix = /^[A-Za-z\s.,'-]{2,50}$/;
  const areaAndLocalityRegix = /^[A-Za-z0-9\s.,'-]{2,100}$/;

  const handleAddressData = (addressData) => {
    const { name, mobileNumber, pincode, locality, area, city, state } =
      addressData;

    if (!nameRegix.test(name)) {
      setAddressFormErrors(() => ({
        nameError: "Only alphabets allowed & cannot start or end with spaces.",
      }));
      return;
    }

    if (!mobileNumberRegix.test(mobileNumber)) {
      setAddressFormErrors(() => ({
        mobileNumberError: "Enter valid mobile number of 10 digit only.",
      }));
      return;
    }
    if (!pincodeRegix.test(pincode)) {
      setAddressFormErrors(() => ({
        pincodeError: "Enter valid pincode, Pincode must be six digit.",
      }));
      return;
    }
    if (!areaAndLocalityRegix.test(locality)) {
      setAddressFormErrors(() => ({
        localityError:
          "Only alphabet & number allowed,Spacial characters are not allowed.",
      }));
      return;
    }
    if (!areaAndLocalityRegix.test(area)) {
      setAddressFormErrors(() => ({
        areaError:
          "Only alphabet & number allowed,Spacial characters are not allowed",
      }));
      return;
    }
    if (!cityAndStateRegix.test(city)) {
      setAddressFormErrors(() => ({
        cityError: "Only alphabates are allowed",
      }));
      return;
    }
    if (!cityAndStateRegix.test(state)) {
      setAddressFormErrors(() => ({
        stateError: "Only alphabates are allowed",
      }));
      return;
    }

    setLoginUserData((prev) => ({
      ...prev,
      addressData: { ...addressData },
    }));

    setUsersData((prev) =>
      prev.map((elem) =>
        elem.email === loginUserData.email
          ? { ...elem, addressData: { ...addressData } }
          : elem
      )
    );

    reset();
    setIsAddressFormOpen(false);
  };

  const handleEditAddress = () => {
    setIsAddressFormOpen(true);
  };

  const { name, pincode, area, city, state, locality } =
    loginUserData.addressData;

  const inputClass =
    "peer w-full h-full outline-none pt-6 pb-2 border focus:border-blue-500 px-2";
  const lableClass =
    "absolute px-2 left-0 top-0 w-full text-sm text-zinc-500 pointer-events-none transition-all peer-placeholder-shown:top-3.5 peer-focus:top-0 peer-focus:text-sm";
  const errorClass =
    "text-red-500 font-semibold text-sm pl-0.5 pt-0.5 leading-none";

  return (
    <>
      {/* Address details */}
      <div
        className={`w-full h-[6vh] lg:h-[8vh] lg:rounded-t ${
          isAddressFormOpen
            ? "bg-blue-500 text-white"
            : "bg-zinc-100 h-[8vh]"
        } flex items-center px-5 justify-between gap-3 mt-3`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 ${
              isAddressFormOpen ? "bg-zinc-100" : "bg-zinc-300"
            } text-blue-500 rounded lg:font-semibold`}
          >
            2
          </span>
          <p
            className={`text-lg uppercase lg:text-xl font-semibold whitespace-nowrap ${
              isAddressFormOpen ? "text-white" : "text-zinc-500"
            }`}
          >
            Delivery Address
          </p>
          {/* if Address form filled than this blue tick shows */}
          {!isAddressFormOpen && (
            <span>
              <MdOutlineDone className="text-xl lg:text-2xl text-blue-500" />
            </span>
          )}
        </div>
        {/* if Address form filled than this change address button shows */}
        {!isAddressFormOpen && (
          <button
            onClick={handleEditAddress}
            className="font-semibold px-2 py-0.5 text-sm border rounded hover:bg-blue-500 hover:text-white lg:text-lg lg:px-5 lg:py-1"
          >
            Change Address
          </button>
        )}
      </div>
      {!isAddressFormOpen && (
        <div className="w-full bg-zinc-100 pl-14 pb-5 pt-1 h-auto lg:rounded-b">
          <div className="font-bold capitalize">{name}</div>
          <div>{area}</div>
          {locality} , {city} , {state}
          <span className="font-semibold"> ({pincode})</span>
        </div>
      )}
      {isAddressFormOpen && (
        <div className="h-[48vh] w-full bg-zinc-100 py-5 px-1.5">
          <form
            onSubmit={handleSubmit((addressData) =>
              handleAddressData(addressData)
            )}
          >
            {/* name */}
            <div className="flex flex-wrap justify-center gap-4.5">
              <div
                className={`relative w-[45%] h-12 ${
                  addressFormErrors.nameError && "mb-8 lg:mb-2.5"
                }`}
              >
                <input
                  {...register("name")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="text"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      nameError: "",
                    }))
                  }
                />
                <label className={lableClass}>Name</label>
                {addressFormErrors.nameError && (
                  <p className={errorClass}>{addressFormErrors.nameError}</p>
                )}
              </div>

              {/* mobile number */}
              <div
                className={`relative w-[45%] h-12 ${
                  addressFormErrors.mobileNumberError && "mb-5 lg:mb-2.5"
                }`}
              >
                <input
                  {...register("mobileNumber")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="tel"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      mobileNumberError: "",
                    }))
                  }
                />
                <label className={lableClass}>Mobile Number (India)</label>
                {addressFormErrors.mobileNumberError && (
                  <p className={errorClass}>
                    {addressFormErrors.mobileNumberError}
                  </p>
                )}
              </div>
              {/* pincode */}
              <div
                className={`relative w-[45%] h-12 ${
                  addressFormErrors.pincodeError && "mb-4.5 lg:mb-2"
                }`}
              >
                <input
                  {...register("pincode")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="text"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      pincodeError: "",
                    }))
                  }
                />
                <label className={lableClass}>Pincode</label>
                {addressFormErrors.pincodeError && (
                  <p className={errorClass}>{addressFormErrors.pincodeError}</p>
                )}
              </div>
              {/* Locality */}
              <div
                className={`relative w-[45%] h-12 ${
                  addressFormErrors.localityError && "mb-10.5 lg:mb-2.5"
                }`}
              >
                <input
                  {...register("locality")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="text"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      localityError: "",
                    }))
                  }
                />
                <label className={lableClass}>Locality</label>
                {addressFormErrors.localityError && (
                  <p className={errorClass}>
                    {addressFormErrors.localityError}
                  </p>
                )}
              </div>

              {/* address area & street */}
              <div
                className={`relative w-[95%] lg:w-[91.8%] h-12 ${
                  addressFormErrors.areaError && "mb-4.5 lg:mb-2"
                }`}
              >
                <input
                  {...register("area")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="text"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      areaError: "",
                    }))
                  }
                />
                <label className={lableClass}>Address (Area & Street)</label>
                {addressFormErrors.areaError && (
                  <p className={errorClass}>{addressFormErrors.areaError}</p>
                )}
              </div>
              {/* City */}
              <div
                className={`relative w-[45%] h-12 ${
                  addressFormErrors.cityError && "mb-5 lg:mb-0"
                }`}
              >
                <input
                  {...register("city")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="text"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      cityError: "",
                    }))
                  }
                />
                <label className={lableClass}>City/District/Towen</label>
                {addressFormErrors.cityError && (
                  <p className={errorClass}>{addressFormErrors.cityError}</p>
                )}
              </div>

              {/* State */}
              <div
                className={`relative w-[45%] h-12 ${
                  addressFormErrors.stateError && "mb-3.5 lg:mb-0"
                }`}
              >
                <input
                  {...register("state")}
                  required //Blank input ko check karega
                  className={inputClass}
                  placeholder=" "
                  type="text"
                  onFocus={() =>
                    setAddressFormErrors(() => ({
                      stateError: "",
                    }))
                  }
                />
                <label className={lableClass}>State</label>
                {addressFormErrors.stateError && (
                  <p className={errorClass}>{addressFormErrors.stateError}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-6.5">
              <button
                className="py-2 px-5 hover:bg-amber-700  bg-amber-600 rounded text-white text-lg transition-all"
                type="submit"
              >
                Save & Deliver Here
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddressDetails;
