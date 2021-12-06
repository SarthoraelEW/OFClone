import React, { useContext, useEffect, useState } from 'react';
import Popup from "reactjs-popup";
import { useDispatch } from 'react-redux';
import { UidContext } from "../AppContext";
import { likePost, unlikePost } from '../../actions/posts.action';

const LikeButton = ({post}) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    setLiked(true);
    dispatch(likePost(post._id, uid));
  };

  const unlike = () => {
    setLiked(false);
    dispatch(unlikePost(post._id, uid));
  };

  useEffect(() => {
    if (post.likes.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likes, liked])

  return (
    <>
      {uid === null && (
        <Popup
          trigger={<span className="material-icons-outlined">favorite_border</span>}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Log in for like a post !</div>
        </Popup>
      )}
      {uid && liked === false && (
        <span className="material-icons-outlined" onClick={like}>favorite_border</span>
      )}
      {uid && liked === true && (
        <span className="material-icons-outlined liked" onClick={unlike}>favorite</span>
      )}
    </>
  );
};

export default LikeButton;