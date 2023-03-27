import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await Axios.post("/api/user/signup", {
          username,
          email,
          password,
        });
        console.log("success");
        navigate("/");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#D8A598] items-center	 justify-items-center	 ">
      <form
        className="flex flex-col bg-[#343136] m-auto p-[8%]  rounded-md	box-border justify-evenly"
        onSubmit={signUpHandler}
      >
        <label htmlFor="username" className="text-white">
          Username
        </label>
        <input
          type="text"
          className="mt-5"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <label htmlFor="email" className="text-white mt-7">
          Email
        </label>
        <input
          type="email"
          className="mt-5"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="text-white mt-7">
          Password
        </label>
        <input
          type="password"
          className="mt-5"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password" className="text-white mt-7">
          Confirm Password
        </label>
        <input
          type="password"
          className="mt-5"
          name="confirmpassword"
          id="confirm-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="bg-slate-200 mt-7 w-[60%] self-center rounded-md">
          Sign Up
        </button>
        <p className=" mt-4  text-white">
          Do you already have an account? <Link to="/signin">Login</Link>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUpScreen;
