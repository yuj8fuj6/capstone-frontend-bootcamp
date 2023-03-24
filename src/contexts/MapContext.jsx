import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants.js";

export const MapContext = createContext();

export const MapContextProvider = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const [locationData, setLocationData] = useState([
    1.3318928747217922, 103.81479959058026,
  ]);

  return (
    <MapContext.Provider value={{ locationData, setLocationData }}>
      {props.children}
    </MapContext.Provider>
  );
};
