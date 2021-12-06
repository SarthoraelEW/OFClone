import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import { UidContext } from "../AppContext";
import { likeComment, unlikeComment, deleteComment } from "../../actions/posts.action";
import PopupMenu from "./PopupMenu";

const Comment = ({ post, comment }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [showingPopupMenu, setShowingPopupMenu] = useState(false);
  const uid = useContext(UidContext);

  const like = () => {
    setLiked(true);
    dispatch(likeComment(post._id, comment._id, uid));
  };

  const unlike = () => {
    setLiked(false);
    dispatch(unlikeComment(post._id, comment._id, uid));
  };

  const dispatchDeleteComment = (id) => {
    if (id === comment._id)
      dispatch(deleteComment(post._id, comment._id));
  }

  const showPopupMenu = () => {
    var popupMenu = document.getElementById("popup-menu-container " + comment._id);
    if (showingPopupMenu) {
      setShowingPopupMenu(false);
      popupMenu.classList.add("hidden");
    } else {
      setShowingPopupMenu(true);
      popupMenu.classList.remove("hidden");
    }
  }

  useEffect(() => {
    if (comment.likes.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post, comment, liked]);

  const usersReducer = useSelector((state) => state.usersReducer);

  const commenter = usersReducer.usersFromPost.filter(
    (user) => user._id === comment.commenterId
  )[0];

  return (
    <div className="comment">
      <img
        className="comment-img"
        src={!isEmpty(commenter) && commenter.profilePicture}
        alt="profil"
      />
      <div className="comment-content">
        <p>
          <span className="pseudo">
            {!isEmpty(commenter) && commenter.displayName + " "}
          </span>
          {" " + comment.message}
        </p>
        <div className="comment-date-reaction">
          <h6>{!isEmpty(comment) && dateParser(comment.date)}</h6>
          {!isEmpty(comment.likes) && (
            <h6>
              {comment.likes.length +
                (comment.likes.length === 1 ? " Like" : " Likes")}
            </h6>
          )}
        </div>
      </div>
      <div className="icons-actions">
        {uid && liked === false && (
          <span className="material-icons-outlined like" onClick={like}>
            favorite_border
          </span>
        )}
        {uid && liked === true && (
          <span className="material-icons-outlined like liked" onClick={unlike}>
            favorite
          </span>
        )}
        <span class="material-icons-outlined more" onClick={showPopupMenu}>more_horiz</span>
        <div id={"popup-menu-container " + comment._id} className="popup-menu-container hidden">
          <PopupMenu deleteComment={dispatchDeleteComment} comment={comment}/>
        </div>
      </div>
    </div>
  );
};

export default Comment;
