import React from "react";
import { Link } from "react-router-dom";
import FeaturedProducts from "../Components/FeaturedProducts";

const HomeScreen = () => {
  return (
    <div className="p-14 flex-col justify-center pb-40 flex ">
      <section className="flex shrink-0	flex-row  h-[40%] pt-10 md:grid md:grid-cols-2">
        <aside className=" md:justify-center h-[100%] flex justify-items-center items-center">
          <p className="text-[#fff] md:hover:leading-[90px] flex text-center md:text-4xl md:leading-[80px]   hover:cursor-pointer leading-[60px] hover:leading-[65px] duration-700 underline	decoration-[#FFB8B8] decoration-3 underline-offset-8    pl-3 font-medium text-2xl ">
            Empower <br /> your <br />
            perfomance
          </p>
        </aside>
        <aside className="flex md:hidden  justify-items-center w-[50%] hover:cursor-pointer items-center">
          <img
            alt="persona"
            className="object-cover duration-500 "
            src={"/assets/homePersonHeader.png"}
          ></img>
        </aside>
        <aside className=" hidden md:flex">
          <img
            alt="persona"
            className="object-cover duration-500 "
            src={"/assets/bg.png"}
          ></img>
        </aside>
      </section>
      <div className="flex pt-10 pb-10 items-center justify-center">
        <Link
          className="align-middle justify-center  md:h-12 md:w-32 items-center flex text-l text-[#fff] bg-slate-500 w-24 h-9 rounded-md"
          to={"/shop"}
        >
          Shop now
        </Link>
      </div>
      <h2 className="text-3xl font-semibold pt-20 text-center text-[#fff]">
        Featured Products
      </h2>
      <FeaturedProducts />
      <div className="flex pt-10 pb-10 items-center justify-center">
        <Link
          className="align-middle justify-center  md:h-12 md:w-32 items-center flex text-l text-[#fff] bg-slate-500 w-24 h-9 rounded-md"
          to={"/shop"}
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
