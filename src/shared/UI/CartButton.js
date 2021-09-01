import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart-action-creator";
import { modalActions } from "../../store/modalSlice";

const CartButton = ({ Item }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const mybooks = useSelector((state) => state.books.mybooks);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const renderButton = () => {
    if (!isSignedIn) {
      return null;
    }

    if (cartItem[Item.itemNumber]) {
      return (
        <button
          className="btn btn--full"
          onClick={() => {
            dispatch(removeItemFromCart(Item.itemNumber));
            dispatch(modalActions.openModal("item removed from cart"));
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
          dispatch(addItemToCart(Item));
          dispatch(modalActions.openModal("item add to cart"));
        }}
      >
        add to cart
      </button>
    );
  };

  return <div>{renderButton()}</div>;
};

export default CartButton;
