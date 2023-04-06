import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { CommentContext } from "../contexts/CommentContext";
import {
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsChatLeft,
  BsFlag,
  BsTrashFill,
} from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import { BACKEND_URL } from "../constants";

const ModalComment = (props) => {
  const { openModal, setOpenModal, postID, userID } = props;
  const { isLoading, isAuthenticated } = useAuth0();
  const { allPostData, setAllPostData, threadCount, setThreadCount } =
    useContext(CommentContext);

  const [allThreads, setAllThreads] = useState([]);

  const currentPost = allPostData.filter((post) => post.id == postID)[0];

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/comments/${postID}/allThreads`).then((res) => {
        setAllThreads(res.data);
        setThreadCount(res.data.length);
      });
    }
  }, [isAuthenticated, postID]);

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
        <div className="grid grid-cols-1 gap-4">
          {currentPost && (
            <div className="grid grid-cols-12 border-1 border-slate-300 rounded-xl p-3">
              <div className="col-span-1 grid grid-cols-1">
                <BsArrowUpCircle className="text-base hover:text-red-200 mx-auto" />
                <span className="font-bold mx-auto">{currentPost.upvote}</span>
                <BsArrowDownCircle className="text-base hover:text-red-200 mx-auto" />
              </div>
              <img
                className="col-span-2 w-16 h-16 rounded-full object-cover"
                alt="officer_photo"
                src={currentPost.user.photo_url}
              />
              <div className="col-span-9">
                <div className="text-left text-xxs font-base grid grid-cols-1">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="text-xs font-bold">
                      {currentPost.user.name} -{" "}
                      <span className="font-light">
                        posted <ReactTimeAgo date={currentPost.updatedAt} />
                      </span>
                    </div>
                    <div className="text-left text-xs font-bold leading-loose">
                      Issue: {currentPost.authority.acronym} {currentPost.code}{" "}
                      - {currentPost.clause}
                    </div>
                  </div>
                </div>
                <div className="text-left text-xs font-light leading-normal">
                  {currentPost.content}
                </div>
                <div className="text-left text-xs font-bold flex flex-row">
                  <div className="flex flex-row mt-4">
                    <BsChatLeft className="mr-3" /> {threadCount} Comments
                    <Link
                      to={"/support"}
                      className="ml-20 flex flex-row hover:text-red-200"
                    >
                      <BsFlag className="mr-3" />
                      Report
                    </Link>
                    {currentPost.user_id == userID && (
                      <div className="ml-20 flex flex-row hover:text-red-200">
                        <BsTrashFill className="mr-3" />
                        Delete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
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
                  <div className="flex flex-row font-bold">
                    <div className="flex flex-row">
                      <BsArrowUpCircle className="text-base hover:text-red-200" />
                      <span className="font-bold mx-3">{thread.upvote}</span>
                      <BsArrowDownCircle className="text-base hover:text-red-200" />
                    </div>
                    <Link
                      to={"/support"}
                      className="ml-20 flex flex-row hover:text-red-200"
                    >
                      <BsFlag className="mr-3" />
                      Report
                    </Link>
                    {thread.user.user_id == userID && (
                      <div className="ml-20 flex flex-row hover:text-red-200">
                        <BsTrashFill className="mr-3" />
                        Delete
                      </div>
                    )}
                  </div>
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
