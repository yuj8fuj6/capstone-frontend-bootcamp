import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";
import MapDisplay from "../components/MapDisplay"; 
import MapSearch from "../components/MapSearch"; 


const Map = () => {
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
        Map
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-5">
          <MapDisplay />
        </div>
        <div className="col-span-2">
          <MapSearch />
        </div>
      </div>
    </div>
  );
};

export default Map;
