import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "./Utils";

const HiddenMenu = ({ handleClose }) => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div className="hidden-hover">
      <div className="hidden-menu">
        <div className="hidden-menu-header">
          <div className="profil-close">
            <img src={!isEmpty(user) && user.profilePicture} alt="profil" />
            <span class="material-icons-outlined close" onClick={handleClose}>
              close
            </span>
          </div>
          <h4>{!isEmpty(user) && user.username}</h4>
          <h5>{!isEmpty(user) && "@" + user.username}</h5>
          <h4>
            {!isEmpty(user) && user.fans.length + " "}
            <span className="underline">Fans</span> -{" "}
            {!isEmpty(user) && user.subscriptions.length + " "}
            <span className="underline">Followings</span>
          </h4>
        </div>
        <ul>
          <li onClick={() => navigate("/profil")}>
            <span class="material-icons-outlined">account_circle</span>
            <h3>My profile</h3>
          </li>
          <li onClick={() => navigate("/edit-profil")}>
            <span class="material-icons-outlined">settings</span>
            <h3>Settings</h3>
          </li>
          <li>
            <span class="material-icons-outlined">credit_card</span>
            <h3>Your Cards</h3>
          </li>
          <li>
            <span class="material-icons-outlined">contact_support</span>
            <h3>Help and support</h3>
          </li>
          <li onClick={logout}>
            <span class="material-icons-outlined">logout</span>
            <h3>Log out</h3>
          </li>
        </ul>
      </div>
      <div className="black-hover" onClick={handleClose}></div>
    </div>
  );
};

export default HiddenMenu;
