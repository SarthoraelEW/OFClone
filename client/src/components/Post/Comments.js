import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../actions/posts.action";
import { getUsersFromPost } from "../../actions/users.action";
import { UidContext } from "../AppContext";
import { isEmpty } from "../Utils";
import Comment from "./Comment";

const Comments = ({ post, handleClick, showNumber }) => {
  const navigate = useNavigate()
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
          post.comments.slice(0, showNumber).map((comment) => {
            return <Comment comment={comment} post={post} key={comment._id} />;
          })}
      </ul>
      <h5 onClick={() => navigate('/post/' + post._id)}>View more comments</h5>
      <div className="new-comment-container">
        <img className="comment-img" src={`${process.env.REACT_APP_PUBLIC_URL}` + user.profilePicture} alt="profil" />
        <input
          type="text"
          name="new-comment"
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
      {showNumber === 3 && <h5 onClick={handleClick}>Hide comments</h5> }
    </>
  );
};

export default Comments;
