import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import ModalComment from "./ModalComment";
import { BsArrowUp, BsChatLeft } from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";
import { CommentContext } from "../contexts/CommentContext";

import { BACKEND_URL } from "../constants";

const CommentList = (props) => {
  const { userID } = props;
  const { isLoading, isAuthenticated } = useAuth0();

  const [openModal, setOpenModal] = useState(false);
  const [postID, setPostID] = useState(0);

  const { allPostData, setAllPostData, threadCount, setThreadCount } =
    useContext(CommentContext);

  return (
    <div>
      <div onClick={() => setOpenModal(true)}>CommentIndividual</div>
      <div className="h-[250px] overflow-auto p-3 grid grid-cols-1 gap-2 border-1 border-slate-200 m-2 rounded-xl">
        {allPostData.map((post, index) => (
          <div
            onClick={() => {
              setOpenModal(true);
              setPostID(post.id);
            }}
            key={index}
            className="bg-white drop-shadow-md rounded-xl hover:bg-lightgreen grid grid-cols-6 p-3 "
          >
            <img
              alt="profile_pic"
              src={post.user.photo_url}
              className="rounded-full"
            />
            <div className="col-span-5 grid grid-cols-1 ml-3 gap-2">
              <div className="text-left text-xxs font-base grid grid-cols-8">
                <div className="col-span-6 grid grid-cols-1 gap-2">
                  <div className="text-xs">
                    {post.user.name} - <span className="text-xxs font-light">posted <ReactTimeAgo date={post.updatedAt} /></span>
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
