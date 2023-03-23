import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MapContext } from "../contexts/MapContext";
import axios from "axios";
import * as L from "leaflet";
import { setView } from "react-leaflet";

const MapSearch = () => {
  const { locationData, setLocationData } = useContext(MapContext);

  const [address, setAddress] = useState("");
  const [planning, setPlanning] = useState("");

  const initialValues = {
    postal_code: "",
    address: address,
    planning_details: planning,
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
      });
    // await axios
    //   .get("https://www.ura.gov.sg/uraDataService/invokeUraDS", {
    //     params: {
    //       service: "Planning_Decision",
    //       last_dnload_date: "15/06/2022",
    //     },
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       AccessKey: "",
    //       Token:
    //         "",
    //     },
    //   })
    //   .then((res) => {
    //     const { data } = res;
    //     console.log(data);
    //   });
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
              <textarea
                type="text"
                id="planning_details"
                name="planning_details"
                className="rounded-xl h-[450px] text-sm font-normal p-3 bg-white"
                value={props.values.planning_details}
                readOnly
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MapSearch;
