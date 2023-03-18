import React from "react";
// import Experience from "../components/Experience";
import ModelCanvas from "../components/Model";

const Landing = () => {
  return (
    <div className="bg-lightgrey h-full w-full grid grid-cols-1 justify-center">
      <div className="text-darkgreen text-xxl font-bold">Hello World!</div>
      <div className="h-full flex flex-row justify-evenly">
        <div className="text-darkgreen text-lg font-bold">Hello World!</div>
        <div className="rounded-lg border-slate-300 border-1 w-1/2">
          <ModelCanvas />
        </div>
        <div className="text-darkgreen text-lg font-bold">Hello World!</div>
      </div>
    </div>
  );
};

export default Landing;
