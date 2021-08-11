import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import history from "../../history";
import CartButton from "./CartButton";
import { addItemToCart } from "../../store/cart-action-creator";

function Show(props) {
  const dispatch = useDispatch();
  const mybooks = useSelector((state) => state.books.mybooks);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const { item } = props;

  const [itemExpand, setItemExpand] = useState(false);
  const [descriptionRef, setDescriptionRef] = useState(null);
  const [showArrow, setShowArrow] = useState(true);

  const desExpand = itemExpand ? "expand" : "";
  const arrow = itemExpand ? "fa-arrow-up" : "fa-arrow-down";

  useEffect(() => {
    if (descriptionRef && descriptionRef.scrollHeight < 150) {
      setShowArrow(false);
    }
  }, [item, descriptionRef]);

  const onExpandClick = () => {
    setItemExpand(!itemExpand);
  };

  const onPurchaseClicked = () => {
    dispatch(addItemToCart(item));
    history.push("/checkout");
  };

  const renderPurchase = () => {
    if (!isSignedIn) {
      return (
        <div className="showitem__read">
          <h2 className="heading2 mb-md">Sign In to purchase</h2>
        </div>
      );
    }

    if (mybooks[item.itemNumber]) {
      return (
        <div className="showitem__read">
          <h2 className="heading2 mb-md">You own this book</h2>
          <CartButton Item={item} />
        </div>
      );
    }
    return (
      <div className="showitem__add">
        <h2 className="heading2 ">purchase</h2>
        <h3 className="heading3 ">your price &yen; {item.itemPrice}</h3>
        <button
          className="btn btn--full btn--primary"
          onClick={onPurchaseClicked}
        >
          purchase
        </button>
        <CartButton Item={item} />
      </div>
    );
  };

  const renderSeemore = () => {
    if (showArrow) {
      return (
        <div className={`showitem__seemore ${desExpand} mt-md`}>
          <span></span>
          <i className={`fas ${arrow}`} onClick={onExpandClick}></i>
          <span></span>
        </div>
      );
    }

    return null;
  };

  if (item) {
    return (
      <div className="showitem">
        <div className="showitem__img-box">
          <img src={item.largeImageUrl} alt="" className="showitem__img" />
        </div>
        <div className="showitem__detail">
          <h2 className="heading2 mb-sm">{item.title}</h2>
          <h3 className="heading3 mb-md">{item.author}</h3>
          <p
            className={`showitem__description ${desExpand}`}
            ref={(ref) => setDescriptionRef(ref)}
          >
            {item.itemCaption}
          </p>

          {renderSeemore()}
        </div>
        {renderPurchase()}
      </div>
    );
  }

  return <div class="ui active centered inline loader mt-lg"></div>;
}

export default Show;
