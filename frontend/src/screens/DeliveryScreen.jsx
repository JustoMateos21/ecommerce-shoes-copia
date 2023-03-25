import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import { StoreContext } from "../store";

const DeliveryScreen = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setFullName(shippingAddress.fullName || "");
    setAddress(shippingAddress.address || "");
    setCity(shippingAddress.city || "");
    setPostalCode(shippingAddress.postalCode || "");
    setCountry(shippingAddress.country || "");
  }, []);

  const deliveryInfoHandler = (e) => {
    e.preventDefault();
    console.log("workikn");

    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col items-center  pt-14 min-h-screen w-screen">
      <ProgressBar percentage={70} />
      <form onSubmit={deliveryInfoHandler} className="flex w-[70%] flex-col ">
        <label htmlFor="name" className="text-white pt-3 pb-2">
          Full name
        </label>
        <input
          id="name"
          value={fullName}
          className="mt-1 text-center rounded-sm"
          type={"text"}
          onChange={(e) => setFullName(e.target.value)}
        ></input>
        <label className="text-white pt-3 pb-2" htmlFor="address">
          Address
        </label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          type="text"
          name="address"
          className="mt-1 text-center rounded-sm"
        />
        <label className="text-white pt-3 pb-2" htmlFor="city">
          City
        </label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
          name="city"
          type="text"
          className="mt-1 text-center rounded-sm"
        />{" "}
        <label className="text-white pt-3 pb-2" htmlFor="postalCode">
          Postal Code
        </label>
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          id="postalCode"
          type="text"
          name="postalCode"
          className="mt-1 text-center rounded-sm"
        />
        <label className="text-white pt-3 pb-2" htmlFor="country">
          Country
        </label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="country"
          type="text"
          name="country"
          className="mt-1 text-center rounded-sm"
        />
        <button
          type="submit"
          className="bg-[#175153] text-white mt-4 p-2 rounded-md"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default DeliveryScreen;
