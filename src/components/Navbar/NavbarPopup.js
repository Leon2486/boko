import React from "react";
import { Link } from "react-router-dom";

function NavbarPopup(props) {
  const userPopUpClass = () => {
    return props.display ? "navbar__user-popup" : "navbar__user-popup hidden";
  };

  return (
    <div className={userPopUpClass()}>
      <ul className="navbar__popup-items">
        <li>
          <Link to="/mybook">my book</Link>
        </li>
        <li>
          <Link to="/checkout">my Cart</Link>
        </li>
        <li>
          <button
            onClick={props.onSignedOutClick}
            className="btn btn--secondary"
          >
            sign out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavbarPopup;
