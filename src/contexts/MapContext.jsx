import React, { createContext, useState } from "react";

export const MapContext = createContext();

export const MapContextProvider = (props) => {
  const [locationData, setLocationData] = useState([
    1.3318928747217922, 103.81479959058026,
  ]);

  return (
    <MapContext.Provider value={{ locationData, setLocationData }}>
      {props.children}
    </MapContext.Provider>
  );
};
