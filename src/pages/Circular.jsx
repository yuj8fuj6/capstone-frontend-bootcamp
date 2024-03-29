import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";
import CircularList from "../components/CircularList";

const Circular = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div className="bg-lightgrey h-full w-full overscroll-none">
      <NavBar />
      <div className="flex flex-row justify-start mt-10 text-2xl font-bold pl-20">
        Circular
      </div>
      <div className="mt-4 pl-20 pr-20">
        <CircularList />
      </div>
    </div>
  );
};

export default Circular;
