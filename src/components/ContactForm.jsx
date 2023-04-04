import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeOption } from "./Option";
import { UserContext } from "../contexts/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Modal } from "antd";
import { BsCheckCircle } from "react-icons/bs";

const issueOptions = [
  { value: "", label: "Choose the relevant issue!" },
  {
    value: "Unable to update profile details",
    label: "Unable to update profile details",
  },
  {
    value: "Unable to find URA planning details in Map",
    label: "Unable to find URA planning details in Map",
  },
  {
    value: "Issues with checklists in Checklist section",
    label: "Issues with checklists in Checklist section",
  },
  {
    value: "Unable to remove building input details",
    label: "Unable to remove building input details",
  },
  {
    value: "Unable to print checklist summaries",
    label: "Unable to print checklist summaries",
  },
  {
    value: "Report inappropriate post/ comment in Comment section",
    label: "Report inappropriate post/ comment in Comment section",
  },
  {
    value: "Report outdated regulation/ clause",
    label: "Report outdated regulation/ clause",
  },
  {
    value: "Request for Pre-consultation with relevant authority",
    label: "Request for Pre-consultation with relevant authority",
  },
  {
    value: "Miscellaneous issues",
    label: "Miscellaneous issues",
  },
];

const governmentAgencyOptions = [
  { value: "", label: "Choose the relevant agency!" },
  {
    value: "URA - Urban Redevelopment Authority",
    label: "URA - Urban Redevelopment Authority",
  },
  {
    value: "BCA - Building and Construction Authority",
    label: "BCA - Building and Construction Authority",
  },
  {
    value: "SCDF - Singapore Civil Defence Force",
    label: "SCDF - Singapore Civil Defence Force",
  },
];

const uraCodeOptions = [
  { value: "", label: "Choose the relevant code!" },
  {
    value: "Gross Floor Area Handbook",
    label: "Gross Floor Area Handbook",
  },
  {
    value: "Flats and Condominiums Handbook",
    label: "Flats and Condominiums Handbook",
  },
  {
    value: "Bungalows or Detached Houses Handbook",
    label: "Bungalows or Detached Houses Handbook",
  },
  {
    value: "Semi-Detached Houses Handbook",
    label: "Semi-Detached Houses Handbook",
  },
  {
    value: "Terrace Houses Handbook",
    label: "Terrace Houses Handbook",
  },
  {
    value: "Strata Landed Housing Handbook",
    label: "Strata Landed Housing Handbook",
  },
  {
    value: "Commercial Handbook",
    label: "Commercial Handbook",
  },
  {
    value: "Hotel Handbook",
    label: "Hotel Handbook",
  },
  {
    value: "Business 1 (Industrial) Handbook",
    label: "Business 1 (Industrial) Handbook",
  },
  {
    value: "Business 2 (Industrial) Handbook",
    label: "Business 2 (Industrial) Handbook",
  },
  {
    value: "Business Park Handbook",
    label: "Business Park Handbook",
  },
  {
    value: "Health and Medical Care Handbook",
    label: "Health and Medical Care Handbook",
  },
  {
    value: "Educational Institution Handbook",
    label: "Educational Institution Handbook",
  },
  {
    value: "Place of Worship Handbook",
    label: "Place of Worship Handbook",
  },
  {
    value: "Civic and Community Institution Handbook",
    label: "Civic and Community Institution Handbook",
  },
  {
    value: "Sports and Recreation Handbook",
    label: "Sports and Recreation Handbook",
  },
  {
    value: "Transport Facilities Handbook",
    label: "Transport Facilities Handbook",
  },
  {
    value: "Agriculture Handbook",
    label: "Agriculture Handbook",
  },
];

const bcaCodeOptions = [
  { value: "", label: "Choose the relevant code!" },
  {
    value: "Approved Document - Acceptable Solutions",
    label: "Approved Document - Acceptable Solutions",
  },
  {
    value: "Code on Accessibility in the Built Environment 2019",
    label: "Code on Accessibility in the Built Environment 2019",
  },
];

const scdfCodeOptions = [
  { value: "", label: "Choose the relevant code!" },
  {
    value: "Fire Code 2018",
    label: "Fire Code 2018",
  },
];

const ContactForm = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [serverState, setServerState] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [stateChange, setStateChange] = useState(true);

  const handleServerResponse = (ok, msg) => {
    setServerState({ ok, msg });
  };

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
  } = userData;

  const personalDetails = `Name: ${name}\n Firm: ${firm}\n Designation: ${designation}\n Professional Reg. No.: ${professional_no}\n Contact No.: ${contact_no}\n Contact Email: ${email} `;

  const contentValidation = Yup.object().shape({
    description: Yup.string().required("Please enter the required field!"),
  });

  const formik = useFormik({
    initialValues: {
      personal_details: personalDetails,
      issue: "",
      agency: "",
      code: "",
      clause: "",
      description: "",
    },
    onSubmit: (values, actions) => {
      handleSubmit(values, actions);
    },
    validationSchema: contentValidation,
  });

  const handleSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: process.env.REACT_APP_FORMSPREE_EMAIL,
      data: values,
    })
      .then((res) => {
        actions.setSubmitting(false);
        actions.resetForm();
        handleServerResponse(true, "Email successfully sent");
        setOpenModal(true);
      })
      .catch((err) => {
        actions.setSubmitting(false);
        handleServerResponse(false, err.response.data.error);
      });
  };

  useEffect(() => {
    if (
      !(JSON.stringify(formik.values) === JSON.stringify(formik.initialValues))
    ) {
      setStateChange(false);
    }
  }, [formik.values]);

  const formCondition =
    formik.values.issue == "Report outdated regulation/ clause" ||
    formik.values.issue ==
      "Request for Pre-consultation with relevant authority";

  return (
    <div className="text-darkgreen grid grid-cols-10">
      <Modal
        open={openModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <div className="flex flex-row justify-start gap-5">
          <BsCheckCircle className="text-green-500 text-2xl" />
          Email successfully sent!
        </div>
      </Modal>
      <form className="col-span-5 mt-4" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1">
          <label htmlFor="clause" className="font-bold text-left col-start-1">
            User Details
          </label>
          <textarea
            type="text"
            id="personal_details"
            name="personal_details"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white h-[140px]"
            value={formik.values.personal_details}
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <label htmlFor="issue" className="font-bold text-left col-start-1">
            Issue:
          </label>
          <select
            tabIndex={0}
            id="issue"
            name="issue"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white"
            value={formik.values.issue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {makeOption(issueOptions)}
          </select>
          {(formik.values.issue == "Report outdated regulation/ clause" ||
            formik.values.issue ==
              "Request for Pre-consultation with relevant authority") && (
            <>
              <label
                htmlFor="issue"
                className="font-bold text-left col-start-1"
              >
                Government Agency:
              </label>
              <select
                tabIndex={0}
                id="agency"
                name="agency"
                className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white"
                value={formik.values.agency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {makeOption(governmentAgencyOptions)}
              </select>
            </>
          )}
          {formCondition &&
            formik.values.agency == "URA - Urban Redevelopment Authority" && (
              <>
                <label
                  htmlFor="code"
                  className="font-bold text-left col-start-1"
                >
                  Code:
                </label>
                <select
                  tabIndex={0}
                  id="code"
                  name="code"
                  className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {makeOption(uraCodeOptions)}
                </select>
              </>
            )}
          {formCondition &&
            formik.values.agency ==
              "BCA - Building and Construction Authority" && (
              <>
                <label
                  htmlFor="code"
                  className="font-bold text-left col-start-1"
                >
                  Code:
                </label>
                <select
                  tabIndex={0}
                  id="code"
                  name="code"
                  className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {makeOption(bcaCodeOptions)}
                </select>
              </>
            )}
          {formCondition &&
            formik.values.agency == "SCDF - Singapore Civil Defence Force" && (
              <>
                <label
                  htmlFor="code"
                  className="font-bold text-left col-start-1"
                >
                  Code:
                </label>
                <select
                  tabIndex={0}
                  id="code"
                  name="code"
                  className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {makeOption(scdfCodeOptions)}
                </select>
              </>
            )}
          {formCondition && formik.values.code && (
            <>
              <label
                htmlFor="clause"
                className="font-bold text-left col-start-1"
              >
                Clause:
              </label>
              <input
                type="text"
                id="clause"
                name="clause"
                className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white"
                value={formik.values.clause}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Input the relevant clause here!"
              />
            </>
          )}
          <label
            htmlFor="description"
            className="font-bold text-left col-start-1"
          >
            Description:
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="border-lightgreen border-1 rounded-xl text-sm font-normal p-2 bg-white h-[300px]"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Describe the issue here!"
          />
          {formik.errors.description && formik.touched.description ? (
            <div className="text-xxs text-red-600 text-left col-end-3">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="mx-auto mt-5">
          <button
            className="rounded-full border-2 border-darkgreen p-1 font-bold mt-4 hover:bg-lightgreen w-1/5 text-sm disabled:border-slate-300 disabled:text-slate-300"
            type="submit"
            disabled={stateChange}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
