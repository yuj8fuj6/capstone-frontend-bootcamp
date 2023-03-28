import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeOption } from "./Option";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import { BACKEND_URL } from "../constants";

const ProfileForm = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [currentUser, setCurrentUserData] = useState({
    name: userData.name,
    dob: userData.dob,
    gender: userData.gender,
    citizenship: userData.citizenship,
    residential_status: userData.residential_status,
    contact_no: userData.contact_no,
    email: userData.email,
    professional_no: userData.professional_no,
    firm: userData.firm,
    designation: userData.designation,
    block_no: userData.block_no,
    street_name: userData.street_name,
    building_name: userData.building_name,
    unit_no: userData.unit_no,
    postal_code: userData.postal_code,
    photo_url: userData.photo_url,
  });

  const {
    name,
    dob,
    gender,
    citizenship,
    residential_status,
    contact_no,
    email,
    professional_no,
    firm,
    designation,
    block_no,
    street_name,
    building_name,
    unit_no,
    postal_code,
    photo_url,
  } = currentUser;

  const debounce = require("lodash.debounce");

  const profileValidation = Yup.object().shape({
    name: Yup.string()
      .required("Please enter the required field!")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field!"),
    contact_no: Yup.number()
      .required("Input a valid phone number!")
      .min(8, "Must be exactly 8 digits")
      .max(8, "Must be exactly 8 digits"),
    email: Yup.string().email().required("Please enter the required field!"),
    professional_no: Yup.number()
      .required("Input a valid professional number!")
      .min(4, "Must be exactly 4 digits")
      .max(4, "Must be exactly 4 digits"),
    firm: Yup.string().required("Please enter the required field!"),
    designation: Yup.string()
      .required("Please enter the required field!")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field!"),
    block_no: Yup.string().required("Please enter the required field!"),
    street_name: Yup.string().required("Please enter the required field!"),
    building_name: Yup.string().required("Please enter the required field!"),
    unit_no: Yup.string().required("Please enter the required field!"),
    postal_code: Yup.string()
      .required("Input a valid postal code!")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });

  const handleSubmit = async (values) => {};

  //Date of Birth Field
  const DatePickerField = ({ name, value, onChange, props }) => {
    return (
      <DatePicker
        {...props}
        className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white w-full"
        selected={(value && new Date(value)) || null}
        onChange={(val) => {
          onChange(name, val);
        }}
      />
    );
  };

  // Gender Options
  const genderOptions = [
    {
      // selected: "selected",
      // disabled: "disabled",
      // hidden: "hidden",
      value: "",
      label: "Choose your gender",
    },
    {
      value: "Male",
      label: "Male",
    },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  // Gender Options
  const residentOptions = [
    {
      // selected: "selected",
      // disabled: "disabled",
      // hidden: "hidden",
      value: "",
      label: "Choose your residential status",
    },
    {
      value: "Citizen",
      label: "Citizen",
    },
    { value: "PR", label: "PR" },
    { value: "Foreigner", label: "Foreigner" },
  ];

  // Nationality Options
  countries.registerLocale(enLocale);

  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return { label: value, value: value };
  });

  const formik = useFormik({
    initialValues: {
      name: name,
      dob: dob,
      gender: gender,
      citizenship: citizenship,
      residential_status: residential_status,
      contact_no: contact_no,
      email: email,
      professional_no: professional_no,
      firm: firm,
      designation: designation,
      block_no: block_no,
      street_name: street_name,
      building_name: building_name,
      unit_no: unit_no,
      postal_code: postal_code,
    },
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
    validationSchema: profileValidation,
  });

  const uraApiCall = debounce(async () => {
    await axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${formik.values.postal_code}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
      )
      .then((res) => {
        const { data } = res;
        const location = data.results[0];
        formik.setFieldValue("block_no", location.BLK_NO);
        formik.setFieldValue("street_name", location.ROAD_NAME);
      });
  }, 2000);

  useEffect(() => {
    uraApiCall();
  }, [formik.values.postal_code, uraApiCall]);

  return (
    <div className="text-darkgreen grid grid-cols-3">
      <form className="col-span-2 mt-4" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-2">
          <label htmlFor="name" className="font-bold text-left">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input your name here!"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.name}
            </div>
          ) : null}
          <label htmlFor="dob" className="font-bold text-left col-start-1">
            Date of Birth:
          </label>
          <div className="col-span-2 place-content-start">
            <DatePickerField
              id="dob"
              name="dob"
              className="col-span-2"
              value={formik.values.dob}
              onChange={formik.setFieldValue}
              onBlur={formik.handleBlur}
            />
          </div>
          <label htmlFor="gender" className="font-bold text-left col-start-1">
            Gender:
          </label>
          <select
            tabIndex={0}
            id="gender"
            name="gender"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {makeOption(genderOptions)}
          </select>
          <label
            htmlFor="citizenship"
            className="font-bold text-left col-start-1"
          >
            Citizenship:
          </label>
          <select
            tabIndex={0}
            id="citizenship"
            name="citizenship"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.citizenship}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {makeOption([
              {
                value: "",
                label: "Choose your nationality",
                selected: "selected",
              },
              ...countryArr,
            ])}
          </select>
          <label
            htmlFor="residential_status"
            className="font-bold text-left col-start-1"
          >
            Residential Status:
          </label>
          <select
            tabIndex={0}
            id="residential_status"
            name="residential_status"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.residential_status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {makeOption(residentOptions)}
          </select>
          <label
            htmlFor="contact_no"
            className="font-bold text-left col-start-1"
          >
            Contact No.:
          </label>
          <input
            type="number"
            id="contact_no"
            name="contact_no"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.contact_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input your contact number here!"
          />
          {formik.errors.contact_no && formik.touched.contact_no ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.contact_no}
            </div>
          ) : null}
          <label htmlFor="email" className="font-bold text-left col-start-1">
            Contact Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input your contact number here!"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.email}
            </div>
          ) : null}
          <label
            htmlFor="professional_no"
            className="font-bold text-left col-start-1"
          >
            Professional Reg. No.:
          </label>
          <input
            type="number"
            id="professional_no"
            name="professional_no"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.professional_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input your professional registration number here!"
          />
          {formik.errors.professional_no && formik.touched.professional_no ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.professional_no}
            </div>
          ) : null}
          <label htmlFor="firm" className="font-bold text-left col-start-1">
            Place of Practice:
          </label>
          <input
            type="text"
            id="firm"
            name="firm"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.firm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input your firm name here!"
          />
          {formik.errors.firm && formik.touched.firm ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.firm}
            </div>
          ) : null}
          <label
            htmlFor="designation"
            className="font-bold text-left col-start-1"
          >
            Designation:
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white col-span-2"
            value={formik.values.designation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input your designation at your firm here!"
          />
          {formik.errors.designation && formik.touched.designation ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.designation}
            </div>
          ) : null}
        </div>
        <div className="font-bold text-left col-start-1 mt-4">
          Address of Practice
        </div>
        <div className="grid grid-cols-4 gap-2 border-1 rounded-xl border-darkgreen text-sm p-2 mt-2">
          <label htmlFor="block_no" className="font-bold text-left col-start-1">
            Building/ Block No.:
          </label>
          <input
            type="text"
            id="block_no"
            name="block_no"
            className="border-lightgreen border-1 rounded-xl font-normal p-1 bg-white col-span-1"
            value={formik.values.block_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Block No."
          />
          {/* {props.errors.block_no && props.touched.block_no ? (
                  <div className="text-xxs text-red-600 text-left col-end-3">
                    {props.errors.block_no}
                  </div>
                ) : null} */}
          <label
            htmlFor="street_name"
            className="font-bold text-left col-span-1"
          >
            Street Name:
          </label>
          <input
            type="text"
            id="street_name"
            name="street_name"
            className="border-lightgreen border-1 rounded-xl font-normal p-1 bg-white col-span-1"
            value={formik.values.street_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Street Name"
          />
          {/* {props.errors.street_name && props.touched.street_name ? (
                  <div className="text-xxs text-red-600 text-left col-end-3">
                    {props.errors.street_name}
                  </div>
                ) : null} */}
          <label
            htmlFor="building_name"
            className="font-bold text-left col-span-1"
          >
            Building Name:
          </label>
          <input
            type="text"
            id="building_name"
            name="building_name"
            className="border-lightgreen border-1 rounded-xl font-normal p-1 bg-white col-span-1"
            value={formik.values.building_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Building Name"
          />
          {/* {props.errors.building_name && props.touched.building_name ? (
                  <div className="text-xxs text-red-600 text-left col-end-3">
                    {props.errors.building_name}
                  </div>
                ) : null} */}
          <label htmlFor="unit_no" className="font-bold text-left col-span-1">
            Unit No.:
          </label>
          <input
            type="text"
            id="unit_no"
            name="unit_no"
            className="border-lightgreen border-1 rounded-xl font-normal p-1 bg-white col-span-1"
            value={formik.values.unit_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Unit No."
          />
          {/* {props.errors.unit_no && props.touched.unit_no ? (
                  <div className="text-xxs text-red-600 text-left col-end-3">
                    {props.errors.unit_no}
                  </div>
                ) : null} */}
          <label
            htmlFor="postal_code"
            className="font-bold text-left col-span-1"
          >
            Postal Code:
          </label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            className="border-lightgreen border-1 rounded-xl font-normal p-1 bg-white col-span-1"
            value={formik.values.postal_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input 6-digit postal code here!"
          />
          {formik.errors.postal_code && formik.touched.postal_code ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.postal_code}
            </div>
          ) : null}
        </div>
        <button
          className="rounded-full border-2 border-darkgreen p-1 font-bold mt-4 hover:bg-lightgreen w-1/5 text-sm"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
