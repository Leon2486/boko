import React, { useState } from "react";
import { Link } from "react-router-dom";

import CartButton from "./CartButton";

export default function BooksDisplay(props) {
  const { books, genreId, title } = props;
  const [carouselRef, setCarouselRef] = useState(null);

  const renderLeftButton = () => {
    if (carouselRef) {
      const onLeftClick = () => {
        carouselRef.scrollBy({
          left: -carouselRef.offsetWidth,
          behavior: "smooth",
        });
      };

      return (
        <button
          className="display__button display__button--left"
          onClick={onLeftClick}
        >
          <i className="fas fa-chevron-left "></i>
        </button>
      );
    }
  };

  const renderRighttButton = () => {
    if (carouselRef) {
      const onRightClick = () => {
        carouselRef.scrollBy({
          left: carouselRef.offsetWidth,
          behavior: "smooth",
        });
      };
      return (
        <button
          className="display__button display__button--right"
          onClick={onRightClick}
        >
          <i className="fas fa-chevron-right "></i>
        </button>
      );
    }
  };

  const renderList = () => {
    if (books) {
      return books.map((Item) => {
        return (
          <div className="display__item" key={Item.itemNumber}>
            <Link to={`/show/${Item.itemNumber}`} className="display__link">
              <div className="display__item-imgbox">
                <img
                  src={Item.largeImageUrl}
                  alt=""
                  className="display__item-img"
                />
              </div>
              <div className="title">{Item.title}</div>
              <div className="author">{Item.author}</div>
              <p className="price">&yen; {Item.itemPrice}</p>
            </Link>
            <CartButton Item={Item} />
          </div>
        );
      });
    }
    return null;
  };

  return (
    <div className="display mb-lg">
      <div className="display__title mb-sm">
        <Link
          to={`/genre/${genreId}`}
          className="heading2 heading2--link mr-auto"
        >
          {title}
        </Link>
        <Link to={`/genre/${genreId}`} className="text text--link">
          view all
        </Link>
      </div>
      <div className="display__itembox">
        <div className="display__carousel">
          {renderLeftButton()}
          <div className="display__items" ref={(ref) => setCarouselRef(ref)}>
            {renderList()}
          </div>
          {renderRighttButton()}
        </div>
      </div>
    </div>
  );
}
