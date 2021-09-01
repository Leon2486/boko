import React from "react";

import BookList from "./BookList";

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
        <BookList items={items} />
      </div>
    </div>
  );
}
