import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const Widget = ({ widgetType }) => {
  const [index, setIndex] = useState(0);

  const usersFromSubscriptions = useSelector(
    (state) => state.usersReducer
  ).usersFromSubscriptions;

  return (
    <div className="widget">
      <h3 className="widget-title">{widgetType}</h3>
      <ul>
        <li>
          <img
            className="rounded-picture"
            src={!isEmpty(usersFromSubscriptions[0 + index]) && usersFromSubscriptions[0 + index].profilePicture}
            alt="profile"
          />
          <div className="widget-card-footer">
            <h2>{!isEmpty(usersFromSubscriptions[0 + index]) && usersFromSubscriptions[0 + index].displayName}</h2>
            <h3>{!isEmpty(usersFromSubscriptions[0 + index]) && usersFromSubscriptions[0 + index].username}</h3>
          </div>
          <img
            className="widget-card-bannery"
            src={!isEmpty(usersFromSubscriptions[0 + index]) && usersFromSubscriptions[0 + index].bannery}
            alt="profile"
          />
        </li>
        <li>
          <img
            className="rounded-picture"
            src={!isEmpty(usersFromSubscriptions[1 + index]) && usersFromSubscriptions[1 + index].profilePicture}
            alt="profile"
          />
          <div className="widget-card-footer">
            <h2>{!isEmpty(usersFromSubscriptions[1 + index]) && usersFromSubscriptions[1 + index].displayName}</h2>
            <h3>{!isEmpty(usersFromSubscriptions[1 + index]) && usersFromSubscriptions[1 + index].username}</h3>
          </div>
          <img
            className="widget-card-bannery"
            src={!isEmpty(usersFromSubscriptions[1 + index]) && usersFromSubscriptions[1 + index].bannery}
            alt="profile"
          />
        </li>
        <li>
          <img
            className="rounded-picture"
            src={!isEmpty(usersFromSubscriptions[2 + index]) && usersFromSubscriptions[2 + index].profilePicture}
            alt="profile"
          />
          <div className="widget-card-footer">
            <h2>{!isEmpty(usersFromSubscriptions[2 + index]) && usersFromSubscriptions[2 + index].displayName}</h2>
            <h3>{!isEmpty(usersFromSubscriptions[2 + index]) && usersFromSubscriptions[2 + index].username}</h3>
          </div>
          <img
            className="widget-card-bannery"
            src={!isEmpty(usersFromSubscriptions[2 + index]) && usersFromSubscriptions[2 + index].bannery}
            alt="profile"
          />
        </li>
      </ul>
    </div>
  );
};

export default Widget;
