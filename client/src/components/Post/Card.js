import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/posts.action';
import { getUsersFromPost } from '../../actions/users.action';
import { UidContext } from '../AppContext';
import { dateParser, isEmpty } from '../Utils';
import Comments from './Comments';
import LikeButton from './LikeButton';
import Medias from './Medias';
import PopupMenuPost from './PopupMenuPost';

const Card = ({ post }) => {
  const dispatch = useDispatch();

  const uid = useContext(UidContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showingPopupMenu, setShowingPopupMenu] = useState(false);
  const userReducer = useSelector((state) => state.userReducer);
  const usersReducer = useSelector((state) => state.usersReducer);
  const [showingMedias, setShowingMedias] = useState(false);

  const [showingComments, setShowingComments] = useState(false);

  useEffect(() => {
    !isEmpty(usersReducer.usersFromSubscriptions[0]) && setIsLoading(false);
  }, [usersReducer]);

  let postCreator = usersReducer.usersFromSubscriptions.filter(poster => poster._id === post.posterId)[0];
  if (isEmpty(postCreator) && post.posterId === uid) {
    postCreator = userReducer;
  }

  const setShowMediasActive = () => {
    var mediasContainer = document.getElementById("medias-container " + post._id);
    if (showingMedias) {
      setShowingMedias(false);
      mediasContainer.classList.add("hidden");
    } else {
      setShowingMedias(true);
      mediasContainer.classList.remove("hidden");
    }
  };

  const showComments = () => {
    var commentsContainer = document.getElementById("comments-container " + post._id);
    if (showingComments) {
      setShowingComments(false);
      commentsContainer.classList.add("hidden");
    } else {
      dispatch(getUsersFromPost(post._id));
      setShowingComments(true);
      commentsContainer.classList.remove("hidden");
    }
  };

  const showPopupMenu = () => {
    var popupMenu = document.getElementById("popup-menu-container " + post._id);
    if (showingPopupMenu) {
      setShowingPopupMenu(false);
      popupMenu.classList.add("hidden");
    } else {
      setShowingPopupMenu(true);
      popupMenu.classList.remove("hidden");
    }
  };

  const deletePostTrigger = () => {
    if (window.confirm("Do you really want to delete this post ?")) {
      showPopupMenu();
      dispatch(deletePost(post._id));
    }
  };

  return (
    <li className="card-container">
      <div id={"medias-container " + post._id} className="medias-container hidden">
        <Medias post={post} handleClick={setShowMediasActive} />
      </div>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-header">
            <img src={`${process.env.REACT_APP_PUBLIC_URL}` + postCreator.profilePicture} alt="profil" />
            <div className="username-displayname">
              <h3>{postCreator.displayName}</h3>
              <h4>{"@" + postCreator.username}</h4>
            </div>
            <h6>{dateParser(post.createdAt)}</h6>
            <span className="material-icons-outlined" onClick={showPopupMenu}>more_vert</span>
            <div id={"popup-menu-container " + post._id} className="popup-menu-container hidden">
              <PopupMenuPost deletePost={deletePostTrigger} post={post}/>
            </div>
          </div>
          <p>{post.message}</p>
          {!isEmpty(post.medias[0]) &&
          <img className="post-media" src={`${process.env.REACT_APP_PUBLIC_URL}` + post.medias[0]} alt="post" onClick={setShowMediasActive} />}
          <div className="likes-comments">
            <LikeButton post={post} />
            <span className="material-icons-outlined" onClick={showComments}>question_answer</span>
          </div>
          <h6>{post.likes.length + " likes - " + post.comments.length + " comments - "}</h6>
          <div id={"comments-container " + post._id} className="comments-container hidden">
            <Comments post={post} showNumber={3} handleClick={showComments}/>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;