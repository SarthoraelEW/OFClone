import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFromPost } from '../../actions/users.action';
import { dateParser, isEmpty } from '../Utils';
import Comments from './Comments';
import LikeButton from './LikeButton';
import Medias from './Medias';

const Card = ({ post }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const usersReducer = useSelector((state) => state.usersReducer);
  const [showingMedias, setShowingMedias] = useState(false);

  const [showingComments, setShowingComments] = useState(false);

  useEffect(() => {
    !isEmpty(usersReducer.usersFromSubscriptions[0]) && setIsLoading(false);
  }, [usersReducer]);

  const postCreator = usersReducer.usersFromSubscriptions.filter(poster => poster._id === post.posterId)[0];

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
  }

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
            <img src={postCreator.profilePicture} alt="profil" />
            <div className="username-displayname">
              <h3>{postCreator.username}</h3>
              <h4>{"@" + postCreator.username}</h4>
            </div>
            <h6>{dateParser(post.createdAt)}</h6>
          </div>
          <p>{post.message}</p>
          {!isEmpty(post.medias[0]) &&
          <img className="post-media" src={post.medias[0]} alt="post" onClick={setShowMediasActive} />}
          <div className="likes-comments">
            <LikeButton post={post} />
            <span className="material-icons-outlined" onClick={showComments}>question_answer</span>
          </div>
          <h6>{post.likes.length + " likes - " + post.comments.length + " comments - "}</h6>
          <div id={"comments-container " + post._id} className="comments-container hidden">
            <Comments post={post} handleClick={showComments}/>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;