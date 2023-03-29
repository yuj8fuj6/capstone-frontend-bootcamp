import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants.js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const { email } = user;
      setEmail(email);
    }
  }, [user, isAuthenticated, isLoading]);

  useEffect(() => {
    if (email) {
      axios.post(`${BACKEND_URL}/users/${email}`).then((res) => {
        setUserData(res.data[0]);
      });
    }
  }, [email]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};
