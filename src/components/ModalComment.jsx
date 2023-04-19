import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { CommentContext } from "../contexts/CommentContext";
import {
  BsArrowUpCircle,
  BsArrowDownCircle,
  BsChatLeft,
  BsFlag,
  BsTrashFill,
  BsCheckCircle,
} from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

import { BACKEND_URL } from "../constants";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ModalComment = (props) => {
  const { openModal, setOpenModal, postID, userID } = props;
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { allPostData, setAllPostData, threadCount, setThreadCount } =
    useContext(CommentContext);

  const [allThreads, setAllThreads] = useState([]);
  const [stateChange, setStateChange] = useState(true);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const currentPost = allPostData.filter((post) => post.id == postID)[0];

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/comments/${postID}/allThreads`).then((res) => {
        setAllThreads(res.data);
        setThreadCount(res.data.length);
      });
    }
  }, [isAuthenticated, postID]);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values, actions) => {
      handleSubmit(values, actions);
    },
  });

  const handleSubmit = async (values, actions) => {
    await axios
      .post(`${BACKEND_URL}/comments/addThread`, {
        content: values.content,
        user_id: userID,
        post_id: postID,
        upvote: 0,
      })
      .then((res) => {
        setAllThreads([res.data, ...allThreads]);
        setThreadCount([res.data, ...allThreads].length);
        setOpenCommentModal(true);
        actions.resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePostUpvote = async () => {
    const filteredPostArray = allPostData.filter((post) => post.id !== postID);
    await axios
      .post(`${BACKEND_URL}/comments/addPostVote`, {
        upvote: true,
        post_id: postID,
        user_id: userID,
      })
      .then((res) => {
        setAllPostData([res.data, ...filteredPostArray]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleThreadUpvote = async (threadID) => {
    const filteredThreadArray = allThreads.filter(
      (thread) => thread.id !== threadID,
    );
    await axios
      .post(`${BACKEND_URL}/comments/addThreadVote`, {
        upvote: true,
        thread_id: threadID,
        user_id: userID,
      })
      .then((res) => {
        setAllThreads([res.data, ...filteredThreadArray]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (
      !(JSON.stringify(formik.values) === JSON.stringify(formik.initialValues))
    ) {
      setStateChange(false);
    }
  }, [formik.values]);

  const handleDelete = async (threadId) => {
    const filteredThreadArray = allThreads.filter(
      (thread) => thread.id !== threadId,
    );
    setAllThreads(filteredThreadArray);
    setThreadCount(filteredThreadArray.length);
    await axios
      .delete(`${BACKEND_URL}/comments/deleteThread`, {
        data: { threadID: threadId },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = async () => {
    const filteredPostArray = allPostData.filter((post) => post.id !== postID);
    setAllPostData(filteredPostArray);
    setOpenModal(false);
    await axios
      .delete(`${BACKEND_URL}/comments/deletePost`, {
        data: { postID: postID },
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                <BsArrowUpCircle
                  className="text-base hover:text-red-200 mx-auto"
                  onClick={() => handlePostUpvote()}
                />
                <span className="font-bold mx-auto">{currentPost.upvote}</span>
                <BsArrowDownCircle
                  className="text-base hover:text-red-200 mx-auto"
                  onClick={() => handlePostUpvote()}
                />
              </div>
              {currentPost.user.photo_url ? (
                <img
                  className="col-span-2 w-16 h-16 rounded-full object-cover"
                  alt="officer_photo"
                  src={currentPost.user.photo_url}
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
              <div className="col-span-9">
                <div className="text-left text-xxs font-base grid grid-cols-1">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="text-xs font-bold">
                      {currentPost.user.name} -{" "}
                      <span className="font-light">
                        posted <ReactTimeAgo date={currentPost.createdAt} />
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
                      <button
                        className="ml-20 flex flex-row hover:text-red-200"
                        onClick={() => {
                          handleDeletePost(currentPost.id);
                        }}
                      >
                        <BsTrashFill className="mr-3" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="text-xs border-1 border-slate-300 rounded-xl overflow-auto  p-5">
            <Modal
              open={openCommentModal}
              okButtonProps={{ hidden: true }}
              cancelButtonProps={{ hidden: true }}
              onOk={() => setOpenCommentModal(false)}
              onCancel={() => setOpenCommentModal(false)}
            >
              <div className="flex flex-row justify-start gap-5">
                <BsCheckCircle className="text-green-500 text-2xl" /> Commented
                successfully!
              </div>
            </Modal>

            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-row flex-wrap justify-end"
            >
              <textarea
                type="text"
                id="content"
                name="content"
                className="rounded-xl text-sm font-normal p-2 bg-white h-[100px] w-full"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Write your comment here!"
              />
              <button
                className="rounded-full border-2 border-darkgreen p-1 font-bold mt-2 hover:bg-lightgreen w-24 text-xs disabled:border-slate-300 disabled:text-slate-300"
                type="submit"
                disabled={stateChange}
              >
                Comment
              </button>
            </form>
          </div>
          <div className="text-xs border-1 border-slate-300 rounded-xl overflow-auto h-[500px] p-5">
            {allThreads.map((thread) => (
              <div className="grid grid-cols-8 mb-8">
                {thread.user.photo_url ? (
                  <img
                    className="col-span-2 w-24 h-24 rounded-full object-cover"
                    alt="officer_photo"
                    src={thread.user.photo_url}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    className="col-span-2 w-24 h-auto mx-auto opacity-60"
                    viewBox="0 0 25 25"
                  >
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                  </svg>
                )}
                <div className="col-span-6 grid grid-cols-1 gap-4">
                  <div className="font-bold">
                    {thread.user.name} -{" "}
                    <span className="font-light">
                      commented <ReactTimeAgo date={thread.createdAt} />
                    </span>
                  </div>
                  <div className="font-light text-justify">
                    {thread.content}
                  </div>
                  <div className="flex flex-row font-bold">
                    <div className="flex flex-row">
                      <BsArrowUpCircle
                        className="text-base hover:text-red-200"
                        onClick={() => handleThreadUpvote(thread.id)}
                      />
                      <span className="font-bold mx-3">{thread.upvote}</span>
                      <BsArrowDownCircle
                        className="text-base hover:text-red-200"
                        onClick={() => handleThreadUpvote(thread.id)}
                      />
                    </div>
                    <Link
                      to={"/support"}
                      className="ml-20 flex flex-row hover:text-red-200"
                    >
                      <BsFlag className="mr-3" />
                      Report
                    </Link>
                    {thread.user_id == userID && (
                      <button
                        className="ml-20 flex flex-row hover:text-red-200"
                        onClick={() => {
                          handleDelete(thread.id);
                        }}
                      >
                        <BsTrashFill className="mr-3" />
                        Delete
                      </button>
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
