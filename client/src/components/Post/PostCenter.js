import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExtendedCard from "./ExtendedCard";

const PostCenter = () => {
  const navigate = useNavigate();

  const post = useSelector((state) => state.postsReducer)[0];

  return (
    <div className="thread">
      <h1 className="thread-header">
        <span
          className="material-icons-outlined arrow-back"
          onClick={() => navigate("/")}
        >
          arrow_back
        </span>{" "}
        POST
      </h1>
      <ExtendedCard post={post} />
    </div>
  );
};

export default PostCenter;
