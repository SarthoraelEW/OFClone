import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../actions/posts.action';
import { getUsersFromPost } from '../actions/users.action';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import PostCenter from '../components/Post/PostCenter';
import WidgetsContainer from '../components/WidgetsContainer';

const Post = () => {
  const uid = useContext(UidContext);
  const { postId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      dispatch(getPost(postId));
      dispatch(getUsersFromPost(postId));
    }
    getData();
  }, [dispatch, postId, uid])

  return (
    <div className="home-page">
      <LeftNav page={"post"} />
      <PostCenter />
      <WidgetsContainer />
    </div>
  );
};

export default Post;