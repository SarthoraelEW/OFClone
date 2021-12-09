import React from 'react';
import LeftNav from '../components/LeftNav';
import NewPostCenter from '../components/NewPost/NewPostCenter';
import WidgetsContainer from '../components/WidgetsContainer';

const NewPost = () => {
  return (
    <div className="home-page">
      <LeftNav page={"new post"}/>
      <NewPostCenter />
      <WidgetsContainer />
    </div>
  );
};

export default NewPost;