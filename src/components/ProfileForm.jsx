import React, { useState, useEffect, useContext} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeOption } from "./Option";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Modal } from "antd";
import { BsCheckCircle } from "react-icons/bs";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "./Button";

import { BACKEND_URL } from "../constants";

const ProfileForm = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState({
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

  const [stateChange, setStateChange] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [updatedPhotoFile, setUpdatedPhotoFile] = useState("");
  const [updatedPhotoFileURL, setUpdatedPhotoFileURL] = useState(photo_url);
  const [changedPhoto, setChangedPhoto] = useState(false);
  const [openUploadPicModal, setOpenUploadPicModal] = useState(false);

  const debounce = require("lodash.debounce");

  const profileValidation = Yup.object().shape({
    name: Yup.string()
      .required("Please enter the required field!")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field!"),
    contact_no: Yup.string()
      .required("Input a valid phone no.!")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(8, "Must be exactly 8 digits")
      .max(8, "Must be exactly 8 digits"),
    email: Yup.string().email().required("Please enter the required field!"),
    professional_no: Yup.string()
      .required("Input a valid professional no.!")
      .matches(/^[0-9]+$/, "Must be only digits")
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

  //Date of Birth Field
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white w-full"
        selected={(value && new Date(value)) || null}
        onChange={(val) => {
          onChange(name, val);
        }}
        dateFormat="dd/MM/yyyy"
      />
    );
  };

  // Gender Options
  const genderOptions = [
    {
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
    onSubmit: (values) => {
      handleSubmit(values);
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
  }, [formik.values.postal_code]);

  useEffect(() => {
    if (
      !(JSON.stringify(formik.values) === JSON.stringify(formik.initialValues))
    ) {
      setStateChange(false);
    }
  }, [formik.values]);

  const handleSubmit = async (values) => {
    await axios
      .put(`${BACKEND_URL}/users/update/${userData.id}`, {
        name: values.name,
        dob: values.dob,
        gender: values.gender,
        citizenship: values.citizenship,
        residential_status: values.residential_status,
        contact_no: values.contact_no,
        email: values.email,
        professional_no: values.professional_no,
        firm: values.firm,
        designation: values.designation,
        block_no: values.block_no,
        street_name: values.street_name,
        building_name: values.building_name,
        unit_no: values.unit_no,
        postal_code: values.postal_code,
      })
      .then((res) => {
        setUserData({
          ...userData,
          name: res.data.name,
          dob: res.data.dob,
          gender: res.data.gender,
          citizenship: res.data.citizenship,
          residential_status: res.data.residential_status,
          contact_no: res.data.contact_no,
          email: res.data.email,
          professional_no: res.data.professional_no,
          firm: res.data.firm,
          designation: res.data.designation,
          block_no: res.data.block_no,
          street_name: res.data.street_name,
          building_name: res.data.building_name,
          unit_no: res.data.unit_no,
          postal_code: res.data.postal_code,
        });
        setCurrentUser(userData);
        setOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle user profile pic upload
  const handleUpdatedPhoto = (e) => {
    setUpdatedPhotoFile(e.target.files[0]);
    const urlDisplay = URL.createObjectURL(e.target.files[0]);
    setUpdatedPhotoFileURL(urlDisplay);
    setChangedPhoto(true);
  };

  // Confirm user profile pic upload
  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    const profilePhotoRef = ref(storage, `${name}`);
    const photoURL = await uploadBytes(profilePhotoRef, updatedPhotoFile).then(
      () =>
        getDownloadURL(profilePhotoRef).then((downloadURL) => {
          return downloadURL;
        }),
    );
    await axios
      .put(`${BACKEND_URL}/users/update/${userData.id}`, {
        photo_url: photoURL,
      })
      .then((res) => {
        setUserData({ ...userData, photo_url: res.data.photo_url });
        setCurrentUser(userData);
        setOpenUploadPicModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setChangedPhoto(false);
  };

  return (
    <div className="text-darkgreen grid grid-cols-3">
      <Modal
        open={openModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <div className="flex flex-row justify-start gap-5">
          <BsCheckCircle className="text-green-500 text-2xl" /> Profile
          successfully updated!
        </div>
      </Modal>
      <Modal
        open={openUploadPicModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpenUploadPicModal(false)}
        onCancel={() => setOpenUploadPicModal(false)}
      >
        <div className="flex flex-row justify-start gap-5">
          <BsCheckCircle className="text-green-500 text-2xl" /> Profile photo
          successfully uploaded and updated!
        </div>
      </Modal>
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
              placeholder="dd/mm/yyyy"
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
          className="rounded-full border-2 border-darkgreen p-1 font-bold mt-4 hover:bg-lightgreen w-1/5 text-sm disabled:border-slate-300 disabled:text-slate-300"
          type="submit"
          disabled={stateChange}
        >
          Update
        </button>
      </form>
      <div>
        {updatedPhotoFileURL ? (
          <img
            src={updatedPhotoFileURL}
            alt="profile pic"
            className="w-72 h-72 mx-auto rounded-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            className="w-72 h-auto mx-auto opacity-60"
            viewBox="0 0 25 25"
          >
            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
          </svg>
        )}
        <label className="flex justify-center mt-5">
          <p className="rounded-full border-2 border-darkgreen p-1 font-bold mt-4 hover:bg-lightgreen w-1/5 text-sm">
            Upload Photo
          </p>
          <input type="file" className="hidden" onChange={handleUpdatedPhoto} />
        </label>
        <div className="flex justify-center p-4">
          {changedPhoto && (
            <Button onClick={handlePhotoSubmit}>Confirm Photo</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
