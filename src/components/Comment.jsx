import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { CommentContext } from "../contexts/CommentContext";
import { makeOption } from "./Option";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import CommentList from "./CommentList";

const Comment = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { allPostData, setAllPostData } = useContext(CommentContext);

  return (
    <div>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        Comment
      </div>
      <div className="grid grid-cols-1">
        <CommentList
          userID={userData.id}
          postFeed={allPostData}
          setPostFeed={setAllPostData}
        />
      </div>
    </div>
  );
};

export default Comment;
