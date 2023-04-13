import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants";

export const ChecklistContext = createContext();

export const ChecklistContextProvider = (props) => {
  const [allAuthorities, setAllAuthorities] = useState([]);

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
    <ChecklistContext.Provider value={{ allAuthorities }}>
      {props.children}
    </ChecklistContext.Provider>
  );
};
