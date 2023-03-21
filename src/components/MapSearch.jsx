import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import { Formik, Form, Field } from "formik";
import { MapContext } from "../contexts/MapContext";

const MapSearch = () => {
  const { locationData, setLocationData } = useContext(MapContext);

  return (
    <div className="text-darkgreen">
      {/* <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {(props) => {
          console.log(props.values);
          return (
            <Form className="grid grid-cols-1">
              <label htmlFor="code" className="text-sm font-bold mt-4">
                Course Code
              </label>
              <select
                type="text"
                id="code"
                name="code"
                className="border-darkgrey border-1 rounded text-sm font-normal indent-3"
                value={props.values.short || props.values.code}
                onChange={props.handleChange}
              >
                {allCourseData &&
                  filteredCourses.map((course) => (
                    <option
                      value={course.course_code}
                      label={course.course_code}
                    >
                      {course.course_code}
                    </option>
                  ))}
              </select>
              <label className="text-sm font-bold mt-4">Course Title</label>
              <select
                type="text"
                id="name"
                name="name"
                className="border-darkgrey border-1 rounded text-sm font-normal indent-3"
                value={props.values.short || props.values.name}
                onChange={props.handleChange}
              >
                {allCourseData &&
                  filteredCourses.map((course) => (
                    <option
                      value={course.course_name}
                      label={course.course_name}
                    >
                      {course.course_name}
                    </option>
                  ))}
              </select>
              <label className="text-sm font-bold mt-4">
                Course Description
              </label>
              <textarea
                type="text"
                id="content"
                name="content"
                className="border-darkgrey border-1 rounded h-[125px] text-sm font-normal p-3"
                value={props.values.short || props.values.content}
                onChange={props.handleChange}
                placeholder="Post your content here!"
              />
              <div className="flex flex-row justify-center">
                <button
                  className="bg-darkgrey rounded-full border-1 p-1 text-yellow font-bold px-3 mt-4 hover:bg-yellow hover:text-darkgrey"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </Form>
          );
        }}
      </Formik> */}
    </div>
  );
};

export default MapSearch;
