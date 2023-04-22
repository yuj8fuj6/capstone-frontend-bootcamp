import React, { createContext, useState } from "react";

export const ModelContext = createContext();

export const ModelContextProvider = (props) => {
  const [modelType, setModelType] = useState("Residential");
  const [showAnnotations, setShowAnnotations] = useState(true);

  return (
    <ModelContext.Provider
      value={{
        modelType,
        setModelType,
        showAnnotations,
        setShowAnnotations,
      }}
    >
      {props.children}
    </ModelContext.Provider>
  );
};
