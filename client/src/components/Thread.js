import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForUser } from "../actions/posts.action";
import { getSubscriptionsUsers } from "../actions/users.action";
import { UidContext } from "./AppContext";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = ({ page }) => {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  //const user = useSelector((state) => state.userReducer);
  const usersReducer = useSelector((state) => state.usersReducer);
  const postsReducer = useSelector((state) => state.postsReducer);

  return (
    <div className="thread">
      <h1 className="thread-header">{page}</h1>
      <ul className="scroll-part">
        {!isEmpty(postsReducer) &&
        postsReducer.map((post) => {
          return <Card post={post} key={post._id} />;
        })}
      </ul>
    </div>
  );
};

export default Thread;
