import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { StoreContext } from "../store";

const links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "shop",
    link: "/shop",
  },
  {
    name: "orders",
    link: "/orders",
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(StoreContext);
  const { userInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    !userInfo ? setIsLoggedIn(false) : setIsLoggedIn(true);
  }, []);

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/signin");
  };

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
  });

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.addEventListener("resize", detectSize);
    };
  }, [windowDimension.width]);

  return (
    <div
      className={
        isMenuOpen || windowDimension.width > 768
          ? "border-b-[1px] border-b-solid  md:flex-row  md:justify-evenly   md:h-[50px] md:w-[100%] md:bg-none border-b-slate-600 flex absolute  flex-col items-center justify-around h-screen w-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]"
          : "flex  absolute items-center justify-around  h-[50px] w-[100%] "
      }
    >
      {!isMenuOpen && (
        <>
          <AiOutlineShoppingCart
            onClick={() => navigate("/cart")}
            cursor={"pointer"}
            color="#f1f1f1"
            size={25}
          />
          <p className="text-xl text-gray-100 font-semibold">Ecommerce Shoes</p>
          <AiOutlineMenu
            cursor={"pointer"}
            className={"md:hidden"}
            onClick={() => setIsMenuOpen(true)}
            color="#f1f1f1"
            size={25}
          />
        </>
      )}
      {isMenuOpen ||
        (windowDimension.width > 768 && (
          <>
            {links.map((l) => (
              <Link
                className="flex md:text-[20px] md:pl-0 md:font-medium pl-10 md:pr-0 pr-10 text-2xl font-semibold  text-[#f1f1f1]"
                to={`${l.link}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {l.name}
              </Link>
            ))}
            <button
              className="flex md:p-1 md:text-[20px] md:rounded-md md:bg-slate-400 pl-10 pr-10 md:text-md text-2xl font-semibold w-15 text-[#f1f1f1]"
              onClick={signOutHandler}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            <div className="flex pt-10">
              <AiOutlineClose
                color="#f1f1f1"
                size={30}
                className={"md:hidden"}
                cursor={"pointer"}
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </>
        ))}
    </div>
  );
};

export default NavBar;
