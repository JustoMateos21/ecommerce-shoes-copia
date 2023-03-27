import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { StoreContext } from "../store";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { userInfo } = state;

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("api/user/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex h-screen w-screen bg-[#D8A598] items-center	justify-items-center	">
      <form
        onSubmit={loginHandler}
        className="flex flex-col bg-[#343136] m-auto p-[8%]  rounded-md	box-border justify-evenly"
      >
        <label htmlFor="email" className="text-white mt-7">
          Email
        </label>
        <input
          type="email"
          className="mt-5"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value || "")}
        />

        <label htmlFor="password" className="text-white mt-7">
          Password
        </label>
        <input
          type="password"
          className="mt-5"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value || "")}
        />
        <button className="bg-slate-200 mt-7 w-[60%] self-center rounded-md">
          Sign In
        </button>
        <p className=" mt-4  text-white">
          Don't you have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
      {error && <p className="text-white">{error}</p>}
    </div>
  );
};

export default SignInScreen;
