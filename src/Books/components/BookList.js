import React from "react";

import BookListItem from "./BooksListItem";

export default function List(props) {
  const { items } = props;

  return (
    <div className="book-list">
      {items.length &&
        items.map((Item) => <BookListItem Item={Item} key={Item.itemNumber} />)}
    </div>
  );
}
