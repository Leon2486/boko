import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeItemFromCart } from "../../store/cart-action-creator";

function Itembox(props) {
  const dispatch = useDispatch();
  const { item } = props;

  const onRemoveClick = (itemNumber) => {
    dispatch(removeItemFromCart(itemNumber));
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

export default Itembox;
