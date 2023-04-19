import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../contexts/UserContext";
import { ChecklistContext } from "../contexts/ChecklistContext";
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
  const {
    allAuthorities,
    gfaCodeChecklist,
    setGfaCodeChecklist,
    planningCodeChecklist,
    setPlanningCodeChecklist,
    accessibilityCodeChecklist,
    setAccessibilityCodeChecklist,
    buildingCodeChecklist,
    setBuildingCodeChecklist,
    fireCodeChecklist,
    setFireCodeChecklist,
    allBuildings,
    setAllBuildings,
    completedGfaCodeCheck,
    setCompletedGfaCodeCheck,
    completedPlanningCodeCheck,
    setCompletedPlanningCodeCheck,
    completedAccessibilityCodeCheck,
    setCompletedAccessibilityCodeCheck,
    completedBuildingCodeCheck,
    setCompletedBuildingCodeCheck,
    completedFireCodeCheck,
    setCompletedFireCodeCheck,
  } = useContext(ChecklistContext);
  const [stateChange, setStateChange] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const debounce = require("lodash.debounce");

  const decimalRegex = /^\d+(\.\d{0,2})?$/;

  const formValidation = Yup.object().shape({
    floor_no: Yup.number()
      .required("Please enter the required field!")
      .integer("Invalid decimal! Input a whole no.!")
      .positive("Input to be a positive no.!"),
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
    const avgFloorHeight = (
      formik.values.building_height / formik.values.floor_no
    ).toFixed(2);
    formik.setFieldValue("avg_floor_height", avgFloorHeight);
  }, [formik.values.floor_no, formik.values.building_height]);

  useEffect(() => {
    const plotRatio = (formik.values.gfa / formik.values.site_area).toFixed(2);
    formik.setFieldValue("plot_ratio", plotRatio);
  }, [formik.values.gfa, formik.values.site_area]);

  useEffect(() => {
    if (
      !(JSON.stringify(formik.values) === JSON.stringify(formik.initialValues))
    ) {
      setStateChange(false);
    }
  }, [formik.values]);

  const handleSubmit = async (values) => {
    await axios
      .post(`${BACKEND_URL}/checklists/addBuilding`, {
        building_type: values.building_type,
        ura_category: values.ura_category,
        scdf_category: values.scdf_category,
        usage: values.usage,
        floor_no: values.floor_no,
        basement_floor_no: values.basement_floor_no,
        building_height: values.building_height,
        avg_floor_height: values.avg_floor_height,
        gfa: values.gfa,
        site_area: values.site_area,
        plot_ratio: values.plot_ratio,
        site_coverage: values.site_coverage,
        habitable_height: values.habitable_height,
        postal_code: values.postal_code,
        block_no: values.block_no,
        street_name: values.street_name,
        user_id: userData.id,
      })
      .then((res) => {
        setOpenModal(true);
        setGfaCodeChecklist(res.data.model_building.gfa_codes);
        setPlanningCodeChecklist(res.data.model_building.planning_codes);
        setAccessibilityCodeChecklist(
          res.data.model_building.accessibility_codes,
        );
        setBuildingCodeChecklist(res.data.model_building.building_codes);
        setFireCodeChecklist(res.data.model_building.fire_codes);
        setAllBuildings([...allBuildings, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        Form
      </div>
      <div className="text-left text-sm ml-4 text-lightgreen">
        Let us know more about the building!
      </div>
      <div className="overflow-auto h-[225px]">
        <Modal
          open={openModal}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
        >
          <div className="flex flex-row justify-start gap-5">
            <BsCheckCircle className="text-green-500 text-2xl" /> Building
            profile successfully updated!
          </div>
        </Modal>
        <form
          className="grid grid-cols-4 text-xs m-3 gap-3 drop-shadow-md border-1 bg-white rounded-xl p-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="col-span-4 grid grid-cols-4 items-center">
            <label htmlFor="building_type" className="text-left col-span-1">
              Building Type:
            </label>
            <select
              tabIndex={0}
              id="building_type"
              name="building_type"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-3"
              value={formik.values.building_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {makeOption(buildingTypeOptions)}
            </select>
            {formik.errors.building_type && formik.touched.building_type ? (
              <div className="text-xxs text-red-600 text-left col-start-1">
                {formik.errors.building_type}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-2 items-center">
            <label htmlFor="ura_category" className="text-left col-span-1">
              URA Category:
            </label>
            <select
              tabIndex={0}
              id="ura_category"
              name="ura_category"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-1"
              value={formik.values.ura_category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {makeOption(uraCategoryOptions)}
            </select>
            <label htmlFor="scdf_category" className="text-left col-span-1">
              SCDF Category:
            </label>
            <select
              tabIndex={0}
              id="scdf_category"
              name="scdf_category"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-1"
              value={formik.values.scdf_category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {makeOption(scdfCategoryOptions)}
            </select>
            {formik.errors.ura_category && formik.touched.ura_category ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-2">
                {formik.errors.building_height}
              </div>
            ) : (
              <div className="col-span-4"></div>
            )}
            {formik.errors.scdf_category && formik.touched.scdf_category ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-5 col-span-2">
                {formik.errors.scdf_category}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-4 items-center">
            <label htmlFor="usage" className="text-left col-span-1">
              Usage:
            </label>
            <select
              tabIndex={0}
              id="usage"
              name="usage"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-3"
              value={formik.values.usage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {makeOption(usageOptions)}
            </select>
            {formik.errors.usage && formik.touched.usage ? (
              <div className="text-xxs text-red-600 text-left col-start-1">
                {formik.errors.usage}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-12 gap-2 items-center">
            <label htmlFor="floor_no" className="text-left col-span-3">
              Floor No.:
            </label>
            <input
              type="number"
              id="floor_no"
              name="floor_no"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.floor_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1"></div>
            <label htmlFor="basement_floor_no" className="text-left col-span-3">
              Basement Floor No.:
            </label>
            <input
              type="number"
              id="basement_floor_no"
              name="basement_floor_no"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.basement_floor_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1"></div>
            {formik.errors.floor_no && formik.touched.floor_no ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-6">
                {formik.errors.floor_no}
              </div>
            ) : (
              <div className="col-span-12"></div>
            )}
            {formik.errors.basement_floor_no &&
            formik.touched.basement_floor_no ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-13 col-span-6">
                {formik.errors.basement_floor_no}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-12 gap-2 items-center">
            <label htmlFor="building_height" className="text-left col-span-3">
              Building Height:
            </label>
            <input
              type="number"
              id="building_height"
              name="building_height"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.building_height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1">m</div>
            <label htmlFor="avg_floor_height" className="text-left col-span-3">
              Avg. Floor Height:
            </label>
            <input
              type="number"
              id="avg_floor_height"
              name="avg_floor_height"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.avg_floor_height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1">m</div>
            {formik.errors.building_height && formik.touched.building_height ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-6">
                {formik.errors.building_height}
              </div>
            ) : (
              <div className="col-span-12"></div>
            )}
            {formik.errors.avg_floor_height &&
            formik.touched.avg_floor_height ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-13 col-span-6">
                {formik.errors.avg_floor_height}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-12 gap-2 items-center">
            <label htmlFor="gfa" className="text-left col-span-3">
              GFA:
            </label>
            <input
              type="number"
              id="gfa"
              name="gfa"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.gfa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1">
              m<sup>2</sup>
            </div>
            <label htmlFor="site_area" className="text-left col-span-3">
              Site Area:
            </label>
            <input
              type="number"
              id="site_area"
              name="site_area"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.site_area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1">
              m<sup>2</sup>
            </div>
            {formik.errors.gfa && formik.touched.gfa ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-6">
                {formik.errors.gfa}
              </div>
            ) : (
              <div className="col-span-12"></div>
            )}
            {formik.errors.site_area && formik.touched.site_area ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-13 col-span-6">
                {formik.errors.site_area}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-12 gap-2 items-center">
            <label htmlFor="plot_ratio" className="text-left col-span-3">
              Plot Ratio:
            </label>
            <input
              type="number"
              id="plot_ratio"
              name="plot_ratio"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.plot_ratio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1"></div>
            <label
              htmlFor="site_coverage"
              className="text-left col-span-3 items-center"
            >
              Site Coverage:
            </label>
            <input
              type="number"
              id="site_coverage"
              name="site_coverage"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.site_coverage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1">%</div>
            {formik.errors.plot_ratio && formik.touched.plot_ratio ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-6">
                {formik.errors.plot_ratio}
              </div>
            ) : (
              <div className="col-span-12"></div>
            )}
            {formik.errors.site_coverage && formik.touched.site_coverage ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-13 col-span-6">
                {formik.errors.site_coverage}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-12 gap-2 items-center">
            <label htmlFor="habitable_height" className="text-left col-span-3">
              Habitable Height:
            </label>
            <input
              type="number"
              id="habitable_height"
              name="habitable_height"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
              value={formik.values.habitable_height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="col-span-1">m</div>
            <label htmlFor="postal_code" className="text-left col-span-3">
              Postal Code:
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-3 indent-2"
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Input 6-digit postal code here!"
            />
            {formik.errors.habitable_height &&
            formik.touched.habitable_height ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-6">
                {formik.errors.habitable_height}
              </div>
            ) : (
              <div className="col-span-12"></div>
            )}
            {formik.errors.postal_code && formik.touched.postal_code ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-13 col-span-6">
                {formik.errors.postal_code}
              </div>
            ) : null}
          </div>
          <div className="col-span-4 grid grid-cols-12 gap-2 items-center">
            <label htmlFor="block_no" className="text-left col-span-3">
              Block No.:
            </label>
            <input
              type="text"
              id="block_no"
              name="block_no"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-3 indent-2"
              value={formik.values.block_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Block No."
            />
            <label htmlFor="street_name" className="text-left col-span-3">
              Street Name:
            </label>
            <input
              type="text"
              id="street_name"
              name="street_name"
              className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-3 indent-2"
              value={formik.values.street_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Street Name"
            />
            {formik.errors.block_no && formik.touched.block_no ? (
              <div className="text-xxs text-red-600 font-light text-left col-start-1 col-span-6">
                {formik.errors.block_no}
              </div>
            ) : (
              <div className="col-span-12"></div>
            )}
            {formik.errors.street_name && formik.touched.street_name ? (
              <div className="text-xxs text-red-600 font-light text-left col-end-13 col-span-6">
                {formik.errors.street_name}
              </div>
            ) : null}
          </div>
          <button
            className="rounded-full border-2 border-darkgreen p-1 font-bold hover:bg-lightgreen text-sm disabled:border-slate-300 disabled:text-slate-300 col-end-5"
            type="submit"
            disabled={stateChange}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuildingForm;
