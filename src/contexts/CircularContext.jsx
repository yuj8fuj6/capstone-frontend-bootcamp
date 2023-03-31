import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { BACKEND_SCRAPER_URL } from "../constants.js";

export const CircularContext = createContext();

export const CircularContextProvider = (props) => {
  const [uraData, setUraData] = useState([]);
  const [bcaData, setBcaData] = useState([]);
  const [scdfData, setScdfData] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_SCRAPER_URL}/circulars/ura`).then((res) => {
      setUraData(res.data);
    });
    axios.get(`${BACKEND_SCRAPER_URL}/circulars/bca`).then((res) => {
      setBcaData(res.data);
    });
    axios.get(`${BACKEND_SCRAPER_URL}/circulars/scdf`).then((res) => {
      setScdfData(res.data);
    });
  }, []);

  return (
    <CircularContext.Provider value={{ uraData, bcaData, scdfData }}>
      {props.children}
    </CircularContext.Provider>
  );
};
