import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";

import { BACKEND_URL } from "../constants";

export const ChecklistContext = createContext();

export const ChecklistContextProvider = (props) => {
  const [allAuthorities, setAllAuthorities] = useState([]);
  const [allBuildings, setAllBuildings] = useState([]);

  const [gfaCodeChecklist, setGfaCodeChecklist] = useState([]);
  const [planningCodeChecklist, setPlanningCodeChecklist] = useState([]);
  const [accessibilityCodeChecklist, setAccessibilityCodeChecklist] = useState(
    [],
  );
  const [buildingCodeChecklist, setBuildingCodeChecklist] = useState([]);
  const [fireCodeChecklist, setFireCodeChecklist] = useState([]);

  const { userData, setUserData } = useContext(UserContext);

  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios
        .all([
          axios.get(`${BACKEND_URL}/checklists/allAuthorities`),
          axios.get(`${BACKEND_URL}/checklists/allBuildings/${userData.id}`),
        ])
        .then(
          axios.spread((data1, data2) => {
            setAllAuthorities(data1.data);
            setAllBuildings(data2.data);
            setGfaCodeChecklist(
              data2.data[data2.data.length - 1].model_building.gfa_codes,
            );
            setPlanningCodeChecklist(
              data2.data[data2.data.length - 1].model_building.planning_codes,
            );
            setAccessibilityCodeChecklist(
              data2.data[data2.data.length - 1].model_building
                .accessibility_codes,
            );
            setBuildingCodeChecklist(
              data2.data[data2.data.length - 1].model_building.building_codes,
            );
            setFireCodeChecklist(
              data2.data(data2.data.length - 1).model_building.fire_codes,
            );
          }),
        );
    }
  }, [isAuthenticated, userData.id]);

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
        allBuildings,
        setAllBuildings,
      }}
    >
      {props.children}
    </ChecklistContext.Provider>
  );
};
