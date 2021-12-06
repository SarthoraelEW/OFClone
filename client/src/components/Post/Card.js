import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersReducer = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    !isEmpty(usersReducer.usersFromSubscriptions[0]) && setIsLoading(false);
  }, [usersReducer]);

  const postCreator = usersReducer.usersFromSubscriptions.filter(poster => poster._id === post.posterId)[0];

  return (
    <li className="card-container">
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
          <img src={post.medias[0]} alt="post" />}
          <div className="likes-comments">
            <LikeButton post={post} />
            <span className="material-icons-outlined">question_answer</span>
          </div>
          <h6>{post.likes.length + " likes - " + post.comments.length + " comments - "}</h6>
        </>
      )}
    </li>
  );
};

export default Card;