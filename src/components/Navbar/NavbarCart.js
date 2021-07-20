import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import history from "../../history";

import Itembox from "../main/Itembox";
import { toggleCart, closeCart } from "../../actions";

function NavbarCart({
  showCart,
  toggleCart,
  cartItem,
  userId,
  cartItemObject,
  closeCart,
}) {
  const toggle = showCart ? "cart-open" : "collapsed";

  history.listen(() => {
    if (showCart) closeCart();
  });

  useEffect(() => {
    if (userId) {
      firebase.firestore().collection("users").doc(userId).set(
        {
          cart: cartItemObject,
        },
        { merge: true }
      );
    }
  }, [cartItemObject, userId]);

  const renderCart = () => {
    return cartItem.map((item) => {
      return (
        <div className="cart__item" key={item.itemNumber}>
          <Itembox item={item} />
        </div>
      );
    });
  };

  const totalPrice = useMemo(() => {
    const renderPrice = () => {
      let subTotal = 0;
      for (let item of cartItem) {
        subTotal += item.itemPrice;
      }
      return (
        <React.Fragment>
          <h3 className="cart__totalPrice">subtotal &yen; {subTotal}</h3>
        </React.Fragment>
      );
    };

    renderPrice(cartItem);
  }, [cartItem]);

  if (cartItem.length) {
    return (
      <div className={`navbar__cart cart__filled ${toggle}`}>
        <div className="cart">
          <div className="cart__goods">{renderCart()}</div>
          <div className="cart__total">
            {totalPrice}
            <Link
              to="/checkout"
              className="btn btn--primary mt-lg cart__checkout"
            >
              checkout
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`navbar__cart ${toggle}`}>
        <h2 className="heading2 mb-sm">your cart is empty</h2>
        <p className="text mb-lg">there is no item in the cart currently</p>
        <button className="btn" onClick={toggleCart}>
          continue shopping
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showCart: state.cart.showCart,
    cartItem: Object.values(state.cart.cartItem),
    userId: state.auth.userId,
    cartItemObject: state.cart.cartItem,
  };
};

export default connect(mapStateToProps, { toggleCart, closeCart })(NavbarCart);
