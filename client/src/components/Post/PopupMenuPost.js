import React, { useContext } from "react";
import { UidContext } from "../AppContext";

const PopupMenuPost = ({ post, deletePost }) => {
  const uid = useContext(UidContext);

  return (
    <div className="popup-menu">
      {post.posterId === uid && (
        <li onClick={() => deletePost(post._id)}>
          <h3>Delete Post</h3>
        </li>
      )}
      <li>
        <h3>Report Post</h3>
      </li>
    </div>
  );
};

export default PopupMenuPost;
