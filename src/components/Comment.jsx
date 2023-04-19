import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import CommentList from "./CommentList";

const Comment = () => {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <div>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        Comment
      </div>
      <div className="grid grid-cols-1">
        <CommentList userID={userData.id} />
      </div>
    </div>
  );
};

export default Comment;
