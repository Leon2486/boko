import React from "react";
import { Link } from "react-router-dom";

const BooksListItem = (props) => {
  const { itemNumber, largeImageUrl, title, author, itemCaption, itemPrice } =
    props.Item;
  return (
    <div className="item__box mb-lg">
      <Link to={`/show/${itemNumber}`} className="item__img-box">
        <img src={largeImageUrl} alt="" className="item__img" />
      </Link>
      <div className="item__detail">
        <h2 className="item__title title">{title}</h2>
        <h3 className="item__author mb-sm">{author}</h3>
        <p className="item__description mb-sm">{itemCaption}</p>
        <div className="item__price">
          &yen; {itemPrice}
          <Link to={`/show/${itemNumber}`} className="item__viewmore">
            view more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksListItem;
