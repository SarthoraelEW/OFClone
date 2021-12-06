import React, { useState } from "react";

const Medias = ({ post, handleClick }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="medias-hover" onClick={(e) => {
      const container = document.getElementsByClassName("medias-hover")[0];
      console.log(e.target);
      console.log(container);
      if (container === e.target) {
        setIndex(0);
        handleClick();
      }
    }}>
      <span
        className="material-icons-outlined close"
        onClick={() => {
          setIndex(0);
          handleClick();
        }}
      >
        close
      </span>
      <span
        className="material-icons-outlined"
        onClick={() => {
          if (index - 1 < 0)
            setIndex(post.medias.length - 1);
          else
          setIndex(index - 1);
        }}
      >
        arrow_back_ios
      </span>
      <img src={post.medias[index]} alt="post_media" />
      <span
        className="material-icons-outlined"
        onClick={() => setIndex((index + 1) % post.medias.length)}
      >
        arrow_forward_ios
      </span>
    </div>
  );
};

export default Medias;
