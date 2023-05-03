import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";

import { BACKEND_URL } from "../constants";

export const ChecklistContext = createContext();

// I feel that we are doing too much here. Maybe we could create a single endpoint that returns you the necessary data in one object, instead of making so many states and API calls here.
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

  const [completedGfaCodeCheck, setCompletedGfaCodeCheck] = useState([]);
  const [completedPlanningCodeCheck, setCompletedPlanningCodeCheck] = useState(
    [],
  );
  const [completedAccessibilityCodeCheck, setCompletedAccessibilityCodeCheck] =
    useState([]);
  const [completedBuildingCodeCheck, setCompletedBuildingCodeCheck] = useState(
    [],
  );
  const [completedFireCodeCheck, setCompletedFireCodeCheck] = useState([]);

  const { userData, setUserData } = useContext(UserContext);

  const { isLoading, isAuthenticated } = useAuth0();

  /*

    I'd recommend a single or two state objects carrying the data like so:

    authorities/buildings {
      authorities: {},
      buildings: {},
    }

    checklists {
      gfa: {},
      planning: {},
      accessibility: {},
      building: {},
      fire: {},
    }

    That way you only need to make 2 state updates in this component, and ideally group that also into 1-2 endpoints.

   */

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios
        .all([
          axios.get(`${BACKEND_URL}/checklists/allAuthorities`),
          axios.get(`${BACKEND_URL}/checklists/allBuildings/${userData.id}`),
          axios.get(`${BACKEND_URL}/checklists/getAllCheckedGfa`),
          axios.get(`${BACKEND_URL}/checklists/getAllCheckedPlanning`),
          axios.get(`${BACKEND_URL}/checklists/getAllCheckedAccessibility`),
          axios.get(`${BACKEND_URL}/checklists/getAllCheckedBuilding`),
          axios.get(`${BACKEND_URL}/checklists/getAllCheckedFire`),
        ])
        .then(
          // naming here could be better.
          // Example: authoritiesData, buildingsData, checkedGfaData etc.
          axios.spread((data1, data2, data3, data4, data5, data6, data7) => {
            const selectedBuildingId = data2.data[0].id;
            setAllAuthorities(data1.data);
            setAllBuildings(data2.data);
            // anytime you access keys of possibly undefined objects, you possibly create bugs in your system.
            setGfaCodeChecklist(data2.data[0].model_building.gfa_codes);
            setPlanningCodeChecklist(
              data2.data[0].model_building.planning_codes,
            );
            setAccessibilityCodeChecklist(
              data2.data[0].model_building.accessibility_codes,
            );
            setBuildingCodeChecklist(
              data2.data[0].model_building.building_codes,
            );
            setFireCodeChecklist(data2.data[0].model_building.fire_codes);
            setCompletedGfaCodeCheck(
              data3.data
                .filter((el) => el.building_id === selectedBuildingId)
                .map((a) => a.gfa_code),
            );
            setCompletedPlanningCodeCheck(
              data4.data
                .filter((el) => el.building_id === selectedBuildingId)
                .map((a) => a.planning_code),
            );
            setCompletedAccessibilityCodeCheck(
              data5.data
                .filter((el) => el.building_id === selectedBuildingId)
                .map((a) => a.accessibility_code),
            );
            setCompletedBuildingCodeCheck(
              data6.data
                .filter((el) => el.building_id === selectedBuildingId)
                .map((a) => a.building_code),
            );
            setCompletedFireCodeCheck(
              data7.data
                .filter((el) => el.building_id === selectedBuildingId)
                .map((a) => a.fire_code),
            );
          }),
        );
    }
  }, [isAuthenticated, userData.id]);

  return (
    <ChecklistContext.Provider
    // if you implement state changes as suggested above, you would only need to pass down a maximum of 4 values here. Way easier to manage the data.
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
        completedGfaCodeCheck,
        setCompletedGfaCodeCheck,
        completedPlanningCodeCheck,
        setCompletedPlanningCodeCheck,
        completedAccessibilityCodeCheck,
        setCompletedAccessibilityCodeCheck,
        completedBuildingCodeCheck,
        setCompletedBuildingCodeCheck,
        completedFireCodeCheck,
        setCompletedFireCodeCheck,
      }}
    >
      {props.children}
    </ChecklistContext.Provider>
  );
};
