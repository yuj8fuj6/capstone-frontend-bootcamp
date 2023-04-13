import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { makeOption } from "./Option";
import { Modal } from "antd";
import { BsCheckCircle } from "react-icons/bs";
import Button from "./Button";

import { BACKEND_URL } from "../constants";

const buildingTypeOptions = [
  { value: "", label: "Choose building type" },
  { value: "Industrial", label: "Industrial" },
  { value: "Residential", label: "Residential" },
  { value: "Recreation", label: "Recreation" },
];

const uraCategoryOptions = [
  { value: "", label: "Choose URA DC Handbook" },
  { value: "Flats and Condominiums", label: "Flats and Condominiums" },
  {
    value: "Bungalows or Detached Houses",
    label: "Bungalows or Detached Houses",
  },
  { value: "Semi-Detached Houses", label: "Semi-Detached Houses" },
  { value: "Terrace Houses", label: "Terrace Houses" },
  { value: "Strata Landed Housing", label: "Strata Landed Housing" },
  { value: "Commercial", label: "Commercial" },
  { value: "Hotel", label: "Hotel" },
  { value: "Business 1 (Industrial)", label: "Business 1 (Industrial)" },
  { value: "Business 2 (Industrial)", label: "Business 2 (Industrial)" },
  { value: "Business Park", label: "Business Park" },
  { value: "Health and Medical Care", label: "Health and Medical Care" },
  { value: "Educational Institution", label: "Educational Institution" },
  { value: "Place of Worship", label: "Place of Worship" },
  {
    value: "Civic and Community Institution",
    label: "Civic and Community Institution",
  },
  { value: "Sports and Recreation", label: "Sports and Recreation" },
  { value: "Transport Facilities", label: "Transport Facilities" },
  { value: "Agriculture", label: "Agriculture" },
];

const scdfCategoryOptions = [
  { value: "", label: "Choose SCDF Purpose Group" },
  { value: "I - Small Residential", label: "I - Small Residential" },
  { value: "II - Other Residential", label: "II - Other Residential" },
  { value: "III - Institutional", label: "III - Institutional" },
  { value: "IV - Office", label: "IV - Office" },
  { value: "V - Shop", label: "V - Shop" },
  { value: "VI - Factory", label: "VI - Factory" },
  {
    value: "VII - Place of Public Resort",
    label: "VII - Place of Public Resort",
  },
  { value: "VIII - Storage", label: "VIII - Storage" },
];

const usageOptions = [
  { value: "", label: "Choose building usage" },
  {
    value: "Factory with Ancillary Offices",
    label: "Factory with Ancillary Offices",
  },
  {
    value: "Good-Class Bungalow",
    label: "Good-Class Bungalow",
  },
  {
    value: "Sports and Recreational Complex",
    label: "Sports and Recreational Complex",
  },
];

const BuildingForm = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [stateChange, setStateChange] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const decimalRegex = /^\d+(\.\d{0,2})?$/;

  const formValidation = Yup.object().shape({
    floor_no: Yup.number()
      .required("Please enter the required field!")
      .integer("Invalid decimal! Input a whole no.!")
      .positive("Input to be a positive no.!")
      .min(1),
    basement_floor_no: Yup.number()
      .required("Please enter the required field!")
      .integer("Invalid decimal! Input a whole no.!")
      .min(0),
    building_height: Yup.number()
      .required("Please enter the required field!")
      .positive("Input to be a positive no.!")
      .test(
        "Height to be a number with a maximum of two decimal places!",
        (val) => {
          if (val != undefined) {
            return decimalRegex.test(val);
          }
          return true;
        },
      ),
    avg_floor_height: Yup.number()
      .required("Please enter the required field!")
      .positive("Input to be a positive no.!")
      .test(
        "Height to be a number with a maximum of two decimal places!",
        (val) => {
          if (val != undefined) {
            return decimalRegex.test(val);
          }
          return true;
        },
      ),
    gfa: Yup.number()
      .required("Please enter the required field!")
      .positive("Input to be a positive no.!")
      .test(
        "Height to be a number with a maximum of two decimal places!",
        (val) => {
          if (val != undefined) {
            return decimalRegex.test(val);
          }
          return true;
        },
      ),
    site_area: Yup.number()
      .required("Please enter the required field!")
      .positive("Input to be a positive no.!")
      .test(
        "Height to be a number with a maximum of two decimal places!",
        (val) => {
          if (val != undefined) {
            return decimalRegex.test(val);
          }
          return true;
        },
      ),
    plot_ratio: Yup.number()
      .required("Please enter the required field!")
      .positive("Input to be a positive no.!")
      .test(
        "Height to be a number with a maximum of two decimal places!",
        (val) => {
          if (val != undefined) {
            return decimalRegex.test(val);
          }
          return true;
        },
      ),
    site_coverage: Yup.number()
      .required("Please enter the required field!")
      .integer("Invalid decimal! Input a whole no.!")
      .min(0),
    habitable_height: Yup.number()
      .required("Please enter the required field!")
      .positive("Input to be a positive no.!")
      .test(
        "Height to be a number with a maximum of two decimal places!",
        (val) => {
          if (val != undefined) {
            return decimalRegex.test(val);
          }
          return true;
        },
      ),
    postal_code: Yup.string()
      .required("Input a valid postal code!")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    block_no: Yup.string().required("Please enter the required field!"),
    street_name: Yup.string().required("Please enter the required field!"),
  });

  const formik = useFormik({
    initialValues: {
      building_type: "",
      ura_category: "",
      scdf_category: "",
      usage: "",
      floor_no: 0,
      basement_floor_no: 0,
      building_height: 0,
      avg_floor_height: 0,
      gfa: 0,
      site_area: 0,
      plot_ratio: 0,
      site_coverage: 0,
      habitable_height: 0,
      postal_code: "",
      block_no: "",
      street_name: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: formValidation,
  });

  const handleSubmit = async (values) => {};

  return (
    <div>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        Form
      </div>
      <form></form>
    </div>
  );
};

export default BuildingForm;
