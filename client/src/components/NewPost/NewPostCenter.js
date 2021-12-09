import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createPost } from "../../actions/posts.action";
import { UidContext } from "../AppContext";
import FileUploader from "./FileUploader";

const NewPostCenter = () => {
  const navigate = useNavigate();

  const uid = useContext(UidContext);

  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [files, setFiles] = useState(null);

  const sendNewPost = () => {
    dispatch(createPost(newPost, files, uid, isPublic));
    navigate('/');
  };

  const addNewFile = (files) => {
    setFiles(files);
  };

  return (
    <div className="new-post">
      <div className="new-post-header">
        <h1>
          <span
            className="material-icons-outlined arrow-back"
            onClick={() => navigate("/")}
          >
            arrow_back
          </span>{" "}
          NEW POST
          <button onClick={sendNewPost}>POST</button>
        </h1>
      </div>
      <form>
        <textarea
          type="text"
          id="newpost-textarea"
          value={newPost}
          placeholder="Compose new post..."
          onChange={(e) => setNewPost(e.target.value)}
        />
        <FileUploader onFilesSelect={addNewFile} />
      </form>
    </div>
  );
};

export default NewPostCenter;
