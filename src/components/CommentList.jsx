import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import ModalComment from "./ModalComment";

import { BACKEND_URL } from "../constants";

const CommentList = (props) => {
  const { userID, postFeed, setPostFeed } = props;
  const { isLoading, isAuthenticated } = useAuth0();

  const [openModal, setOpenModal] = useState(false);
  const [postID, setPostID] = useState(0);

  console.log(postFeed);

  return (
    <div>
      <div onClick={() => setOpenModal(true)}>CommentIndividual</div>
      {postFeed.map((post) => (
        <div
          onClick={() => {
            setOpenModal(true);
            setPostID(post.id);
          }}
        >
          Hello
        </div>
      ))}
      <ModalComment
        openModal={openModal}
        setOpenModal={setOpenModal}
        postID={postID}
      />
    </div>
  );
};

export default CommentList;
