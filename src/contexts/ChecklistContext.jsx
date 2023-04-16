import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants";

export const ChecklistContext = createContext();

export const ChecklistContextProvider = (props) => {
  const [allAuthorities, setAllAuthorities] = useState([]);

  const [gfaCodeChecklist, setGfaCodeChecklist] = useState([]);
  const [planningCodeChecklist, setPlanningCodeChecklist] = useState([]);
  const [accessibilityCodeChecklist, setAccessibilityCodeChecklist] = useState(
    [],
  );
  const [buildingCodeChecklist, setBuildingCodeChecklist] = useState([]);
  const [fireCodeChecklist, setFireCodeChecklist] = useState([]);

  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.all([axios.get(`${BACKEND_URL}/checklists/allAuthorities`)]).then(
        axios.spread((data1) => {
          setAllAuthorities(data1.data);
        }),
      );
    }
  }, [isAuthenticated]);

  return (
    <ChecklistContext.Provider
      value={{
        allAuthorities,
        gfaCodeChecklist,
        setGfaCodeChecklist,
        planningCodeChecklist,
        setPlanningCodeChecklist,
        accessibilityCodeChecklist,
        setAccessibilityCodeChecklist,
        buildingCodeChecklist,
        setBuildingCodeChecklist,
        fireCodeChecklist,
        setFireCodeChecklist,
      }}
    >
      {props.children}
    </ChecklistContext.Provider>
  );
};
