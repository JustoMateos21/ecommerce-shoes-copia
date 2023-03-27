import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Stars = ({ stars }) => {
  return (
    <div className="flex items-center justify-center p-4 w-full flex-row">
      {stars === 1 || stars < 2 ? (
        <div className="flex">
          <AiFillStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
        </div>
      ) : stars === 2 || stars < 3 ? (
        <div className="flex">
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
        </div>
      ) : stars === 3 || stars < 4 ? (
        <div className="flex">
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiOutlineStar size={25} />
          <AiOutlineStar size={25} />
        </div>
      ) : stars === 4 || stars < 5 ? (
        <div className="flex">
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiOutlineStar size={25} />
        </div>
      ) : (
        <div className="flex">
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiFillStar size={25} />
          <AiFillStar size={25} />
        </div>
      )}
    </div>
  );
};

export default Stars;
