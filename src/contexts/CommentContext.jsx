import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants";

export const CommentContext = createContext();

export const CommentContextProvider = (props) => {
  const [allPostData, setAllPostData] = useState([]);

  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/comments/allPosts`).then((res) => {
        setAllPostData(res.data);
      });
    }
  }, [isAuthenticated]);

  return (
    <CommentContext.Provider value={{ allPostData, setAllPostData }}>
      {props.children}
    </CommentContext.Provider>
  );
};
