import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
  const { items } = props;

  const renderList = () => {
    if (items.length) {
      return items.map((Item) => {
        return (
          <div className="item__box mb-lg" key={Item.itemNumber}>
            <Link to={`/show/${Item.itemNumber}`} className="item__img-box">
              <img src={Item.largeImageUrl} alt="" className="item__img" />
            </Link>
            <div className="item__detail">
              <h2 className="item__title title">{Item.title}</h2>
              <h3 className="item__author mb-sm">{Item.author}</h3>
              <p className="item__description mb-sm">{Item.itemCaption}</p>
              <div className="item__price">
                &yen; {Item.itemPrice}
                <Link
                  to={`/show/${Item.itemNumber}`}
                  className="item__viewmore"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
        );
      });
    }
    return null;
  };

  return <React.Fragment>{renderList()}</React.Fragment>;
}
