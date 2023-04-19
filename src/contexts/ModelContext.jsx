import React, { createContext, useState } from "react";

export const ModelContext = createContext();

export const ModelContextProvider = (props) => {
  const [modelType, setModelType] = useState("Residential")

  return (
    <ModelContext.Provider value={{modelType, setModelType }}>
      {props.children}
    </ModelContext.Provider>
  );
};

