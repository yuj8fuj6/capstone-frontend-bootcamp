import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";
import ModelCanvas from "../components/Model";

const Landing = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div className="bg-lightgrey h-full w-full overscroll-none grid grid-cols-1 justify-center">
      <NavBar />
      <div className="text-darkgreen text-xl font-bold">Hello World!</div>
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
