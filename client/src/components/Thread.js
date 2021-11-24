import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsForUser } from "../actions/posts.action";
import { getUser } from "../actions/user.actions";
import { getSubscriptionsUsers } from "../actions/users.action";
import { UidContext } from "./AppContext";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = ({ page }) => {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const usersReducer = useSelector((state) => state.usersReducer);
  const postsReducer = useSelector((state) => state.postsReducer);

  useEffect(() => {
    const getData = async () => {
      dispatch(getUser(uid));
      dispatch(getSubscriptionsUsers(uid));
      dispatch(getPostsForUser(uid));
    };
    getData();
  }, [dispatch, uid]);

  return (
    <div className="thread">
      <h1 className="thread-header">{page}</h1>
      <ul className="scroll-part">
        {postsReducer.posts.map((post) => {
          console.log("Yo");
          return <Card post={post} key={post._id} />;
        })}
      </ul>
    </div>
  );
};

export default Thread;
