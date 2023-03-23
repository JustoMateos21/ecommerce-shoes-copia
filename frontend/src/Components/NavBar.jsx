import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";

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
  {
    name: "logout",
    link: "/logout",
  },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={
        isMenuOpen
          ? "flex absolute flex-col items-center justify-around h-screen w-screen bg-gradient-to-t from-[#FFB8B8] to-[#1E1E1E]"
          : "flex  absolute items-center justify-around  h-[50px] w-[100%] "
      }
    >
      {!isMenuOpen && (
        <>
          <AiOutlineShoppingCart cursor={"pointer"} color="#f1f1f1" size={25} />
          <p className="text-xl text-gray-100 font-semibold">Ecommerce Shoes</p>
          <AiOutlineMenu
            cursor={"pointer"}
            onClick={() => setIsMenuOpen(true)}
            color="#f1f1f1"
            size={25}
          />
        </>
      )}
      {isMenuOpen && (
        <>
          {links.map((l) => (
            <Link
              className="flex pl-10 pr-10 text-2xl font-semibold w-15 text-[#f1f1f1]"
              to={`${l.link}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {l.name}
            </Link>
          ))}
          <div className="flex pt-10">
            <AiOutlineClose
              color="#f1f1f1"
              size={30}
              cursor={"pointer"}
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
