import React, { useState } from "react";
import { Link } from "react-router-dom";

import BookCarouselItem from "./BookCarouselItem";

export default function BooksDisplay(props) {
  const { books, genreId, title } = props;
  const [carouselRef, setCarouselRef] = useState(null);

  const renderArrow = (direction) => {
    const onClick = () => {
      carouselRef.scrollBy({
        left:
          direction === "left"
            ? -carouselRef.offsetWidth
            : carouselRef.offsetWidth,
        behavior: "smooth",
      });
    };

    return (
      <button
        className={`display__button display__button--${
          direction === "left" ? "left" : "right"
        }`}
        onClick={onClick}
      >
        <i
          className={`fas fa-chevron-${
            direction === "left" ? "left" : "right"
          }`}
        ></i>
      </button>
    );
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
          {renderArrow("left")}
          <div className="display__items" ref={(ref) => setCarouselRef(ref)}>
            {books &&
              books.map((Item) => (
                <BookCarouselItem Item={Item} key={Item.itemNumber} />
              ))}
          </div>
          {renderArrow("right")}
        </div>
      </div>
    </div>
  );
}
