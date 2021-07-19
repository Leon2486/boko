import React from "react";
import { connect } from "react-redux";

import { addCart, removeCart } from "../../actions";

function cartButton({ Item, cartItem, addCart, removeCart, mybooks }) {
  if (cartItem[Item.itemNumber]) {
    return (
      <button
        className="btn btn--full"
        onClick={() => {
          removeCart(Item.itemNumber);
        }}
      >
        remove
      </button>
    );
  } else if (mybooks[Item.itemNumber]) {
    return <button className="btn btn--primary">start reading</button>;
  }
  return (
    <button
      className="btn btn--full"
      onClick={() => {
        addCart(Item);
      }}
    >
      add to cart
    </button>
  );
}

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart.cartItem,
    mybooks: state.books.mybooks,
  };
};

export default connect(mapStateToProps, { addCart, removeCart })(cartButton);
