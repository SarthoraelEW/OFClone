import React from "react";
import { useSelector } from "react-redux";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = ({ page }) => {

  //const user = useSelector((state) => state.userReducer);
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
