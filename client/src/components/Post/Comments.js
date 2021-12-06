import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../actions/posts.action";
import { getUsersFromPost } from "../../actions/users.action";
import { UidContext } from "../AppContext";
import { isEmpty } from "../Utils";
import Comment from "./Comment";

const Comments = ({ post, handleClick }) => {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const [newComment, setNewComment] = useState("");

  const sendComment = () => {
    if (newComment === "")
      return;
    dispatch(commentPost(post._id, newComment, uid));
    dispatch(getUsersFromPost(post._id));
    setNewComment("");
  };

  return (
    <>
      <ul>
        {!isEmpty(post.comments) &&
          post.comments.slice(0, 3).map((comment) => {
            return <Comment comment={comment} post={post} key={comment._id} />;
          })}
      </ul>
      <h5>View more comments</h5>
      <div className="new-comment-container">
        <img className="comment-img" src={user.profilePicture} alt="profil" />
        <input
          type="text"
          name="query"
          id="new-comment"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              sendComment();
          }}
        ></input>
        <span class="material-icons-outlined like" onClick={sendComment}>
          reply
        </span>
      </div>
      <h5 onClick={handleClick}>Hide comments</h5>
    </>
  );
};

export default Comments;
