import React from 'react';
import Widget from './Widgets/Widget';

const WidgetsContainer = () => {
  return (
    <div className="widgets-container">
      <div className="search-bar">
        <input type="text" name="query" id="query" placeholder="Search users"></input>
        <span class="material-icons-outlined">search</span>
      </div>
      <Widget widgetType={"subscriptions"} />
    </div>
  );
};

export default WidgetsContainer;