import React from "react";

const Button = (props) => {
  return (
    <button
      className="rounded-full border-2 border-darkgreen p-1 font-bold mt-4 hover:bg-lightgreen w-1/5 text-sm"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
