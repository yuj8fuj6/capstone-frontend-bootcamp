import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { CommentContext } from "../contexts/CommentContext";
import { BsArrowUp, BsChatLeft } from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";

import { BACKEND_URL } from "../constants";

const ModalComment = (props) => {
  const { openModal, setOpenModal, postID, userID } = props;
  const { isLoading, isAuthenticated } = useAuth0();
  const { allPostData, setAllPostData, threadCount, setThreadCount } =
    useContext(CommentContext);

  const [allThreads, setAllThreads] = useState([]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/comments/${postID}/allThreads`).then((res) => {
        setAllThreads(res.data);
        setThreadCount(res.data.length);
      });
    }
  }, [isAuthenticated, postID]);

  console.log(allThreads);

  return (
    <>
      <Modal
        open={openModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => setOpenModal(false)}
        centered={true}
        width="700px"
      >
        <div className="grid grid-cols-1">
          <div></div>
          <div></div>
          <div className="text-xs border-1 border-slate-300 rounded-xl overflow-auto h-[500px] p-5">
            {allThreads.map((thread) => (
              <div className="grid grid-cols-8">
                <img
                  className="col-span-2 w-24 h-24 rounded-full object-cover"
                  alt="officer_photo"
                  src={thread.user.photo_url}
                />
                <div className="col-span-6 grid grid-cols-1 gap-4">
                  <div className="font-bold">
                    {thread.user.name} -{" "}
                    <span className="font-light">
                      commented <ReactTimeAgo date={thread.updatedAt} />
                    </span>
                  </div>
                  <div className="font-light text-justify">
                    {thread.content}
                  </div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComment;
