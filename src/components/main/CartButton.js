import React from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addCart, removeCart, openModal } from "../../actions";

function cartButton({
  Item,
  cartItem,
  addCart,
  removeCart,
  mybooks,
  isSignedIn,
  openModal,
}) {
  const renderButton = () => {
    if (!isSignedIn) {
      return null;
    }

    if (cartItem[Item.itemNumber]) {
      return (
        <button
          className="btn btn--full"
          onClick={() => {
            removeCart(Item.itemNumber);
            openModal("item removed from cart");
          }}
        >
          remove
        </button>
      );
    } else if (mybooks[Item.itemNumber]) {
      return (
        <button className="btn btn--primary btn--full">start reading</button>
      );
    }
    return (
      <button
        className="btn btn--full"
        onClick={() => {
          addCart(Item);
          openModal("item add to cart");
        }}
      >
        add to cart
      </button>
    );
  };

  return <div>{renderButton()}</div>;
}

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart.cartItem,
    mybooks: state.books.mybooks,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { addCart, removeCart, openModal })(
  cartButton
);
