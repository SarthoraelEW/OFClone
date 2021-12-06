import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPostsForUser } from "../actions/posts.action";
import { getSubscriptionsUsers } from "../actions/users.action";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import WidgetsContainer from "../components/WidgetsContainer";

const Home = () => {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      dispatch(getPostsForUser(uid));
      dispatch(getSubscriptionsUsers(uid));
    };
    getData();
  }, [dispatch, uid]);

  return (
    <div className="home-page">
      <LeftNav page={"home"}/>
      <Thread page={"home"}/>
      <WidgetsContainer />
    </div>
  );
};

export default Home;
