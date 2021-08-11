import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";

import Itembox from "../main/Itembox";
import { bookPurchase } from "../../store/book-action-creator";
import { cartActions } from "../../store/cartSlice";

function CheckOut() {
  const dispatch = useDispatch();
  const cartItemObject = useSelector((state) => state.cart.cartItem);
  const cartItem = useSelector((state) => Object.values(state.cart.cartItem));

  const renderItem = () => {
    return cartItem.map((item) => {
      return (
        <div className="cart__item" key={item.itemNumber}>
          <Itembox item={item} />
        </div>
      );
    });
  };

  const renderPayment = () => {
    return (
      <form className="checkout__payment mb-lg">
        <h2 className="heading2 mb-lg">payment confirm</h2>
        <label htmlFor="" className="checkout__info">
          your card number (please don't give me the real one)
        </label>
        <input type="text" placeholder="xxxx-xxxx-xxxx-xxxx" />
      </form>
    );
  };

  const renderPrice = () => {
    let subTotal = 0;
    for (let item of cartItem) {
      subTotal += item.itemPrice;
    }
    return (
      <React.Fragment>
        <h3 className="cart__totalPrice">total amount &yen; {subTotal}</h3>
      </React.Fragment>
    );
  };

  const onPurchaseClick = () => {
    dispatch(cartActions.emptyCart());
    dispatch(bookPurchase(cartItemObject));

    history.push("/");
  };

  if (cartItem.length) {
    return (
      <div className="container">
        <div className="checkout">
          <div className="checkout__items">{renderItem()}</div>
          <div className="checkout__confirm">
            {renderPayment()}
            <h2 className="heading2 mb-sm">purchase</h2>
            {renderPrice()}
            <button
              className="btn btn--primary mt-md"
              onClick={onPurchaseClick}
            >
              purchase
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="checkout__empty">
          <h2 className="heading2 mb-sm">your cart is empty</h2>
          <p className="text mb-lg">there is no item in the cart currently</p>
          <Link to="/" className="btn">
            continue shopping
          </Link>
        </div>
      </div>
    );
  }
}

export default CheckOut;
