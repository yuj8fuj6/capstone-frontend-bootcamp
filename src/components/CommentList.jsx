import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import ModalComment from "./ModalComment";
import { BsArrowUp, BsChatLeft, BsCheckCircle } from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";
import { CommentContext } from "../contexts/CommentContext";
import { makeOption } from "./Option";
import { Modal } from "antd";

import { BACKEND_URL } from "../constants";

const authorityOptions = [
  { value: "", label: "Agency" },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
];

const codeOptions = [
  { value: null, label: "Code" },
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
  {
    value: "Approved Document - Acceptable Solutions",
    label: "Approved Document - Acceptable Solutions",
  },
  {
    value: "Code on Accessibility in the Built Environment 2019",
    label: "Code on Accessibility in the Built Environment 2019",
  },
  {
    value: "Fire Code 2018",
    label: "Fire Code 2018",
  },
];

const CommentList = (props) => {
  const { userID } = props;
  const { isLoading, isAuthenticated } = useAuth0();

  const [openModal, setOpenModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postID, setPostID] = useState(0);
  const [stateChange, setStateChange] = useState(true);

  const { allPostData, setAllPostData, threadCount, setThreadCount } =
    useContext(CommentContext);

  const postFormValidation = Yup.object().shape({
    content: Yup.string().required("Please enter the required field!"),
  });

  const formik = useFormik({
    initialValues: {
      authority_id: null,
      code: "",
      clause: "",
      content: "",
    },
    onSubmit: (values, actions) => {
      handleSubmit(values, actions);
    },
    validationSchema: postFormValidation,
  });

  useEffect(() => {
    if (
      !(JSON.stringify(formik.values) === JSON.stringify(formik.initialValues))
    ) {
      setStateChange(false);
    }
  }, [formik.values]);

  const handleSubmit = async (values, actions) => {
    await axios
      .post(`${BACKEND_URL}/comments/addPost`, {
        authority_id: values.authority_id,
        code: values.code,
        clause: values.clause,
        content: values.content,
        upvote: 0,
        user_id: userID,
      })
      .then((res) => {
        setOpenPostModal(true);
        setAllPostData([res.data, ...allPostData]);
        actions.resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="border-1 border-slate-200 h-[150px] p-3 rounded-xl m-2 text-xs">
        <Modal
          open={openPostModal}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onOk={() => setOpenPostModal(false)}
          onCancel={() => setOpenPostModal(false)}
        >
          <div className="flex flex-row justify-start gap-5">
            <BsCheckCircle className="text-green-500 text-2xl" /> Post
            successfully posted!
          </div>
        </Modal>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-5 gap-2">
          <label htmlFor="issue" className="font-bold text-left col-start-1">
            Issue:
          </label>
          <select
            tabIndex={0}
            id="authority_id"
            name="authority_id"
            className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-1"
            value={formik.values.authority_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {makeOption(authorityOptions)}
          </select>
          <select
            tabIndex={0}
            id="code"
            name="code"
            className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-1"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {makeOption(codeOptions)}
          </select>
          <input
            type="text"
            id="clause"
            name="clause"
            className="border-lightgreen border-1 rounded-xl font-normal bg-white col-span-2 indent-2"
            value={formik.values.clause}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Input Clause"
          />
          <div className="text-left text-xxs col-start-1 col-span-5">
            1 - URA, 2 - BCA, 3 - SCDF
          </div>
          <textarea
            type="text"
            id="content"
            name="content"
            className="rounded-xl font-normal p-2 bg-white h-[40px] col-span-5"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Write your post here!"
          />
          {formik.errors.content && formik.touched.content ? (
            <div className="text-xxs text-red-600 text-left col-span-3 font-light">
              {formik.errors.content}
            </div>
          ) : null}
          <button
            className="rounded-full border-2 border-darkgreen font-bold mt-2 hover:bg-lightgreen w-20 text-xs disabled:border-slate-300 disabled:text-slate-300 col-start-5 col-span-2"
            type="submit"
            disabled={stateChange}
          >
            Comment
          </button>
        </form>
      </div>
      <div className="h-[230px] overflow-auto p-3 grid grid-cols-1 gap-2 border-1 border-slate-200 m-2 rounded-xl">
        {allPostData.map((post, index) => (
          <div
            onClick={() => {
              setOpenModal(true);
              setPostID(post.id);
            }}
            key={index}
            className="bg-white drop-shadow-md rounded-xl hover:bg-lightgreen grid grid-cols-6 p-3 "
          >
            {post.user.photo_url ? (
              <img
                alt="profile_pic"
                src={post.user.photo_url}
                className="rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                className="w-10 h-auto mx-auto opacity-60"
                viewBox="0 0 25 25"
              >
                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
              </svg>
            )}
            <div className="col-span-5 grid grid-cols-1 ml-3 gap-2">
              <div className="text-left text-xxs font-base grid grid-cols-8">
                <div className="col-span-6 grid grid-cols-1 gap-2">
                  <div className="text-xs">
                    {post.user.name} -{" "}
                    <span className="text-xxs font-light">
                      posted <ReactTimeAgo date={post.createdAt} />
                    </span>
                  </div>
                  <div className="text-left text-xxs font-bold leading-tight">
                    Issue: {post.authority.acronym} {post.code} - {post.clause}
                  </div>
                </div>
                <img
                  className="col-span-2 h-3/4"
                  alt="agency_logo"
                  src={post.authority.logo_url}
                />
              </div>
              <div className="text-left text-xxs font-light leading-tight">
                {post.content}
              </div>
              <div className="text-left text-xxs font-bold flex flex-row">
                <BsArrowUp /> {post.upvote} Upvotes
                <div className="ml-5 flex flex-row">
                  {/* To delete if cannot solve comment count */}
                  <BsChatLeft /> {threadCount} Comments
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalComment
        openModal={openModal}
        setOpenModal={setOpenModal}
        postID={postID}
        userID={userID}
      />
    </div>
  );
};

export default CommentList;
