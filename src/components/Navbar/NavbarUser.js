import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavbarPopup from "./NavbarPopup";
import { cartActions } from "../../store/cartSlice";

function NavbarUser({ onSignedOutClick }) {
  const [popUpDisplay, setPopUpDisplay] = useState(false);
  const dispatch = useDispatch();
  const cartItemAmount = useSelector(
    (state) => Object.values(state.cart.cartItem).length
  );

  useEffect(() => {
    const bodyOnClick = () => {
      setPopUpDisplay(false);
    };

    document.body.addEventListener("click", bodyOnClick, { capture: false });

    return () => {
      document.body.removeEventListener("click", bodyOnClick, {
        capture: false,
      });
    };
  }, []);

  const renderCartAmount = () => {
    if (cartItemAmount && cartItemAmount <= 9) {
      return (
        <React.Fragment>
          <span className="navbar__user-cartNote">{cartItemAmount}</span>
        </React.Fragment>
      );
    } else if (cartItemAmount > 9) {
      return (
        <React.Fragment>
          <span className="navbar__user-cartNote">9+</span>
        </React.Fragment>
      );
    }

    return null;
  };

  const userIconClick = (e) => {
    e.stopPropagation();
    setPopUpDisplay((curPopUpDisplay) => !curPopUpDisplay);
  };

  const onCartClick = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <div className="navbar__user">
      <ul className="navbar__user-items">
        <li className="navbar__user-cart" onClick={onCartClick}>
          <i className="fas fa-shopping-cart"></i>
          <span>cart</span>
          {renderCartAmount()}
        </li>
        <li className="navbar__user-icon" onClick={userIconClick}>
          <i className="far fa-user"></i>
          <span>
            account<i className="fas fa-chevron-down"></i>
          </span>
        </li>
      </ul>
      <NavbarPopup display={popUpDisplay} onSignedOutClick={onSignedOutClick} />
    </div>
  );
}

export default NavbarUser;
