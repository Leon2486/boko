import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { removeCart } from "../../actions";

function Itembox(props) {
  const { item, removeCart } = props;

  const onRemoveClick = (itemNumber) => {
    removeCart(itemNumber);
  };

  return (
    <React.Fragment>
      <Link to={`/show/${item.itemNumber}`} className="cart__img-box">
        <img src={item.mediumImageUrl} alt="" className="cart__img" />
      </Link>
      <div className="cart__detail">
        <h3 className="cart__title">{item.title}</h3>
        <p className="cart__author">{item.author}</p>
        <div className="cart__purchase">
          <p className="cart__price">&yen; {item.itemPrice}</p>
          <button
            className="btn"
            onClick={() => onRemoveClick(item.itemNumber)}
          >
            remove
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default connect(null, { removeCart })(Itembox);
