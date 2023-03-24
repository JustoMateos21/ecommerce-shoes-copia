import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-[90%] mt-1 mb-4 border-[1px]  border-solid border-r-blue-700 h-2 rounded-md">
      <div className={`h-[100%] w-[${percentage}%] bg-slate-300 rounded`}></div>
    </div>
  );
};

export default ProgressBar;
