import React, { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";
import ModelCanvas from "../components/Model";
import { BsMouse } from "react-icons/bs";
import Chat from "../components/Chat";
import Comment from "../components/Comment";
import BuildingForm from "../components/BuildingForm";
import Checklist from "../components/Checklist";
import { ModelContext } from "../contexts/ModelContext";
import { makeOption } from "../components/Option";
import { useFormik } from "formik";

const modelOptions = [
  { value: "", label: "Choose building type" },
  { value: "Industrial", label: "Industrial" },
  { value: "Residential", label: "Residential" },
  { value: "Community", label: "Community" },
];

const Landing = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const { modelType, setModelType } = useContext(ModelContext);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      model_type: "",
    },
  });

  return (
    <div className="bg-lightgrey h-full w-full overscroll-none grid grid-cols-1 justify-center">
      <NavBar />
      <div className="grid grid-cols-12 mt-5 text-xl font-bold">
        <p className="col-start-4 col-span-1">Building Type</p>
        <form>
          <select
            tabIndex={0}
            id="model_type"
            name="model_type"
            className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 text-darkgreen text-sm "
            value={formik.values.model_type}
            onChange={(e) => {
              setModelType(e.target.value);
            }}
            onBlur={formik.handleBlur}
          >
            {makeOption(modelOptions)}
          </select>
        </form>
        <div className="flex flex-row gap-2 col-start-8 col-span-2">
          <BsMouse className="text-2xl" />
          <span className="text-xs font-normal">
            Scroll to <br />
            Zoom
          </span>
          <span className="text-xs font-normal">
            Left Click to <br />
            rotate
          </span>
          <span className="text-xs font-normal">
            Right Click to <br />
            shift
          </span>
        </div>
      </div>
      <div className="h-full flex flex-row justify-evenly">
        <div className="text-darkgreen text-lg font-bold grid grid-cols-1 mt-2 gap-5 mb-5">
          <div className="bg-white h-[300px] w-[400px] rounded-xl overscroll-none">
            <BuildingForm />
          </div>
          <div className="bg-white h-[450px] w-[400px] rounded-xl overscroll-none">
            <Checklist />
          </div>
        </div>
        <div className="rounded-lg border-slate-300 border-1 w-1/2 h-[770px] mt-2">
          <ModelCanvas />
        </div>
        <div className="text-darkgreen text-lg font-bold grid grid-cols-1 mt-2">
          <div className="bg-white h-[300px] w-[400px] rounded-xl overscroll-none">
            <Chat />
          </div>
          <div className="bg-white h-[450px] w-[400px] rounded-xl overscroll-none">
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
