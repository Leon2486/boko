import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import history from "../history";

import Itembox from "../shared/UI/Itembox";
import { cartActions } from "../store/cartSlice";

function NavbarCart() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const cartItem = useSelector((state) => Object.values(state.cart.cartItem));

  const show = showCart ? "cart-open" : "collapsed";

  history.listen(() => {
    if (showCart) dispatch(cartActions.closeCart());
  });

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
    return renderPrice(cartItem);
  }, [cartItem]);

  if (cartItem.length) {
    return (
      <div className={`navbar__cart cart__filled ${show}`}>
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
      <div className={`navbar__cart ${show}`}>
        <h2 className="heading2 mb-sm">your cart is empty</h2>
        <p className="text mb-lg">there is no item in the cart currently</p>
        <button
          className="btn"
          onClick={() => dispatch(cartActions.closeCart())}
        >
          continue shopping
        </button>
      </div>
    );
  }
}

export default NavbarCart;
