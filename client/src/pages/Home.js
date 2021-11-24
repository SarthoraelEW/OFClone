import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/user.actions";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import WidgetsContainer from "../components/WidgetsContainer";

const Home = () => {
  return (
    <div className="home-page">
      <LeftNav page={"home"}/>
      <Thread page={"home"}/>
      <WidgetsContainer />
    </div>
  );
};

export default Home;
