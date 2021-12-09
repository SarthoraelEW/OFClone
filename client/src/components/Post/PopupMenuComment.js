import React, { useContext } from 'react';
import { UidContext } from '../AppContext';

const PopupMenuComment = ({ comment, deleteComment}) => {
  const uid = useContext(UidContext);

  return (
    <ul className="popup-menu">
      { comment.commenterId === uid &&
      <li onClick={() => deleteComment(comment._id)}>
        <h3>Delete Comment</h3>
      </li>
      }
      <li>
        <h3>Report Comment</h3>
      </li>
    </ul>
  );
};

export default PopupMenuComment;