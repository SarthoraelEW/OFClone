import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../actions/user.actions";
import { UidContext } from "./AppContext";
import HiddenMenu from "./HiddenMenu";

const LeftNav = ({ page }) => {
  let navigate = useNavigate();
  const [showingHiddenMenu, setShowingHiddenMenu] = useState(false);

  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    const getData = async () => {
      dispatch(getUser(uid));
    };
    getData();
  }, [dispatch, uid]);

  const setHiddenMenuActive = () => {
    var hiddenMenu = document.getElementById("hidden-menu-container");
    console.log("Yo");
    if (showingHiddenMenu) {
      setShowingHiddenMenu(false);
      hiddenMenu.classList.add("hidden");
    } else {
      setShowingHiddenMenu(true);
      hiddenMenu.classList.remove("hidden");
    }
  };


  return (
    <div className="leftnav">
      <div id="hidden-menu-container" className="hidden-menu-container hidden">
        <HiddenMenu handleClose={setHiddenMenuActive}/>
      </div>
      <ul>
        <li className="profil-picture">
          <img src={user.profilePicture} alt="profil" onClick={setHiddenMenuActive} />
        </li>
        <li className={page === "home" ? "active page-link" : "page-link"} onClick={() => {navigate('/')}}>
          <span class="material-icons-outlined">home</span>
          <h2>Home</h2>
        </li>
        <li className={page === "notifications" ? "active page-link" : "page-link"} onClick={() => {navigate('/notifications')}}>
          <span class="material-icons-outlined">notifications</span>
          <h2>Notifications</h2>
        </li>
        <li className={page === "messages" ? "active page-link" : "page-link"} onClick={() => {navigate('/messages')}}>
          <span class="material-icons-outlined">sms</span>
          <h2>Messages</h2>
        </li>
        <li className={page === "subscriptions" ? "active page-link" : "page-link"} onClick={() => {navigate('/subscriptions')}}>
          <span class="material-icons-outlined">person</span>
          <h2>Subscriptions</h2>
        </li>
        <li className={page === "profil" ? "active page-link" : "page-link"} onClick={() => {navigate('/profil')}}>
          <span class="material-icons-outlined">account_circle</span>
          <h2>My profile</h2>
        </li>
        <li className={page === "more" ? "active page-link" : "page-link"}>
          <span class="material-icons-outlined">more_horiz</span>
          <h2>More</h2>
        </li>
        <li className="newpost-button">
          <span class="material-icons-outlined">add</span>
          <h3>NEW POST</h3>
        </li>
      </ul>
    </div>
  );
};

export default LeftNav;
