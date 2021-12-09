import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import Medias from "./Medias";

const ExtendedCard = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersReducer = useSelector((state) => state.usersReducer);
  const [showingMedias, setShowingMedias] = useState(false);

  useEffect(() => {
    !isEmpty(usersReducer.usersFromPost[0]) && setIsLoading(false);
  }, [usersReducer]);

  const postCreator = usersReducer.usersFromPost.filter(
    (poster) => poster._id === post.posterId
  )[0];

  const setShowMediasActive = () => {
    var mediasContainer = document.getElementById(
      "medias-container " + post._id
    );
    if (showingMedias) {
      setShowingMedias(false);
      mediasContainer.classList.add("hidden");
    } else {
      setShowingMedias(true);
      mediasContainer.classList.remove("hidden");
    }
  };

  return (
    <ul className="scroll-part">
      <li className="card-container">
        {!isEmpty(post) && !isEmpty(postCreator) && (
          <>
            <div
              id={"medias-container " + post._id}
              className="medias-container hidden"
            >
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
                </div>
                <p>{post.message}</p>
                {!isEmpty(post.medias[0]) && (
                  <img
                    className="post-media"
                    src={`${process.env.REACT_APP_PUBLIC_URL}` + post.medias[0]}
                    alt="post"
                    onClick={setShowMediasActive}
                  />
                )}
                <div className="likes-comments">
                  <LikeButton post={post} />
                  <span className="material-icons-outlined">
                    question_answer
                  </span>
                </div>
                <h6>
                  {post.likes.length +
                    " likes - " +
                    post.comments.length +
                    " comments - "}
                </h6>
                <div
                  id={"comments-container " + post._id}
                  className="comments-container"
                >
                  <Comments post={post} showNumber={10} />
                </div>
              </>
            )}
          </>
        )}
      </li>
    </ul>
  );
};

export default ExtendedCard;
