import React from "react";

import List from "./List";

export default function ShowList(props) {
  const { items, title } = props;

  const renderTitle = () => {
    if (title) {
      return (
        <React.Fragment>
          <h2 className="heading2 mb-lg">search result of "{title}"</h2>
        </React.Fragment>
      );
    }
    return null;
  };

  return (
    <div className="container mt-lg">
      {renderTitle()}
      <div className="searchPage">
        <List items={items} />
      </div>
    </div>
  );
}
