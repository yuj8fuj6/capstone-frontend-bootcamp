import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants";

const ModalComment = (props) => {
  const { openModal, setOpenModal, postID } = props;
  const { isLoading, isAuthenticated } = useAuth0();

  const [allThreads, setAllThreads] = useState([]);

  console.log(postID)

  // useEffect(() => {
  //   if (!isLoading && isAuthenticated) {
  //     axios.get(`${BACKEND_URL}/comments/allThreads`).then((res) => {
  //       setAllThreads(res.data);
  //     });
  //   }
  // }, [isAuthenticated]);

  return (
    <>
      <Modal
        open={openModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <div className="flex flex-row justify-start gap-5">
          Profile successfully updated!
        </div>
      </Modal>
    </>
  );
};

export default ModalComment;
