import React from "react";
import { Link } from "react-router-dom";

import CartButton from "../../shared/UI/CartButton";

const BookCarouselItem = (props) => {
  const { itemNumber, largeImageUrl, title, author, itemPrice } = props.Item;
  return (
    <div className="display__item">
      <Link to={`/show/${itemNumber}`} className="display__link">
        <div className="display__item-imgbox">
          <img src={largeImageUrl} alt="" className="display__item-img" />
        </div>
        <div className="title">{title}</div>
        <div className="author">{author}</div>
        <p className="price">&yen; {itemPrice}</p>
      </Link>
      <CartButton Item={props.Item} />
    </div>
  );
};

export default BookCarouselItem;
