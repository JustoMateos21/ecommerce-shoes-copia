import React from "react";

const FeaturedProducts = () => {
  return (
    <div className="flex flex-col">
      <section className="grid grid-cols-2   gap-10 pt-6">
        <div className="flex flex-col justify-around items-end  pt-20">
          <span className="h-2 w-28  bg-[#4D211B] flex-end rounded-md p-1"></span>
          <span className="h-2 w-20  bg-[#084039] flex-end rounded-md p-1"></span>
          <span className="h-2 w-16  bg-[#4F2119] flex-end rounded-md p-1"></span>
          <span className="h-2 w-14  bg-[#DB734A] flex-end rounded-md p-1"></span>
        </div>
        <div>
          <img src={"/assets/featuredShoe.png"} alt="" />
        </div>
      </section>
      <p className="pt-10 pb-4 text-2xl text-center text-white ">Adidas fly</p>
      <section className="grid pt-10 grid-cols-2  md:grid-cols-3 pl-2">
        <div className="flex bg-[#D9D9D9] focus:h-[270px] p-4 h-[250px] ">
          <img
            src={"/assets/featuredShoe1.png"}
            alt="shoe"
            className="object-contain    hover:cursor-pointer"
          ></img>
        </div>
        <aside className="grid h-[250px] md:col-span-2  md:grid-cols-2 md:grid-rows-1  grid-rows-2 pl-2 gap-2 pr-2">
          <div className="bg-[#D9D9D9] flex justify-center border-sm">
            <img
              className="object-contain  hover:cursor-pointer "
              src={"/assets/featuredShoe2.png"}
              alt=""
            />
          </div>
          <div className="bg-[#D9D9D9] flex justify-center border-sm">
            <img
              className="object-contain  hover:cursor-pointer "
              src={"/assets/featuredShoe3.png"}
              alt=""
            />
          </div>
        </aside>
      </section>
    </div>
  );
};

export default FeaturedProducts;
