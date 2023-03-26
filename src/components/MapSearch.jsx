import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MapContext } from "../contexts/MapContext";
import axios from "axios";

import { BACKEND_URL } from "../constants.js";

const MapSearch = () => {
  const { locationData, setLocationData } = useContext(MapContext);

  const [address, setAddress] = useState("");
  const [addressNoPostalCode, setAddressNoPostalCode] = useState("");
  const [planningParam, setPlanningParam] = useState({});
  const [planningType, setPlanningType] = useState({});

  const initialValues = {
    postal_code: "",
    address: address,
  };

  const postalCodeValidation = Yup.object().shape({
    postal_code: Yup.string()
      .required("Input a valid postal code!")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });

  const handleSubmit = async (values) => {
    await axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${values.postal_code}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
      )
      .then((res) => {
        const { data } = res;
        const location = data.results[0];
        setAddress(location.ADDRESS);
        setLocationData([location.LATITUDE, location.LONGITUDE]);
        setAddressNoPostalCode(`${location.BLK_NO} ${location.ROAD_NAME}`);
      });
    // URA API call does not work!
    // await axios
    //   .get(
    //     "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Planning_Decision&last_dnload_date=15/06/2022",
    //     {
    //       params: {
    //         service: "Planning_Decision",
    //         last_dnload_date: "15/06/2022",
    //       },
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         AccessKey: "",
    //         Token:
    //           "",
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     const { data } = res;
    //     console.log(data);
    //   });
    await axios
      .get(`${BACKEND_URL}/maps/planningType?postal_code=${values.postal_code}`)
      .then((res) => {
        setPlanningType(res.data).catch((err) => {
          console.log(err);
        });
      });
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/maps/planningParam?address=${addressNoPostalCode}`)
      .then((res) => {
        setPlanningParam(res.data).catch((err) => {
          console.log(err);
        });
      });
  }, [addressNoPostalCode]);

  const stingifyKey = (str) => {
    var i,
      frags = str.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  };

  return (
    <div className="text-darkgreen">
      <Formik
        initialValues={initialValues}
        validationSchema={postalCodeValidation}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {(props) => {
          return (
            <Form className="grid grid-cols-1 mr-20">
              <label htmlFor="postal" className="font-bold mt-4 text-left">
                Search Postal Code
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                className="border-lightgreen border-1 rounded-xl text-base font-normal p-2 bg-white"
                maxLength="6"
                size="6"
                value={props.values.postal_code}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                placeholder="Input 6-digit Postal Code here!"
              />
              {props.errors.postal_code && props.touched.postal_code ? (
                <div className="text-xs text-red-600 text-left">
                  {props.errors.postal_code}
                </div>
              ) : null}
              <button
                className="rounded-full border-2 border-darkgreen p-1 font-bold mt-4 hover:bg-lightgreen w-1/5 text-sm"
                type="submit"
              >
                Search
              </button>
              <label className="font-bold mt-4 text-left">
                Address Details
              </label>
              <textarea
                type="text"
                id="address"
                name="address"
                className="rounded-xl h-[80px] text-sm font-normal p-3 bg-white"
                value={address}
                readOnly
              />
              <label className="font-bold mt-4 text-left">
                Planning Details
              </label>
              <div className="rounded-xl h-[450px] text-sm font-normal p-3 bg-white text-left">
                <h1 className="font-bold text-base">Planning Parameters</h1>
                {planningType
                  ? Object.entries(planningType).map(([key, value], i) => (
                      <li key={i}>
                        {stingifyKey(key)} :{" "}
                        <span className="font-bold">{value}</span>
                      </li>
                    ))
                  : null}
                <div className="rounded-xl border-1 drop-shadow-md bg-white w-full px-2 mt-2 overflow-auto h-[200px]">
                  <h1 className="font-bold">Recent Planning Decisions</h1>
                  {planningParam
                    ? Object.entries(planningParam).map(([key, value], i) => (
                        <li key={i} className="text-xs">
                          {stingifyKey(key)} :{" "}
                          <span className="font-bold">{value}</span>
                        </li>
                      ))
                    : null}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MapSearch;
