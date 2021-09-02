import React, { useState, useEffect } from "react";

import CartButton from "../../shared/UI/CartButton";

function Show(props) {
  const { item, mybooks, isSignedIn, onPurchaseClicked } = props;

  const [itemExpand, setItemExpand] = useState(false);
  const [descriptionRef, setDescriptionRef] = useState(null);
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    if (descriptionRef && descriptionRef.scrollHeight < 150)
      setShowArrow(false);
  }, [item, descriptionRef]);

  const onExpandClick = () => setItemExpand(!itemExpand);

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

  const seemore = (
    <div className={`showitem__seemore ${itemExpand ? "expand" : ""} mt-md`}>
      <span></span>
      <i
        className={`fas ${itemExpand ? "fa-arrow-up" : "fa-arrow-down"}`}
        onClick={onExpandClick}
      ></i>
      <span></span>
    </div>
  );

  if (!item) return null;

  return (
    <div className="showitem">
      <div className="showitem__img-box">
        <img src={item.largeImageUrl} alt="" className="showitem__img" />
      </div>
      <div className="showitem__detail">
        <h2 className="heading2 mb-sm">{item.title}</h2>
        <h3 className="heading3 mb-md">{item.author}</h3>
        <p
          className={`showitem__description ${itemExpand ? "expand" : ""}`}
          ref={(ref) => setDescriptionRef(ref)}
        >
          {item.itemCaption}
        </p>
        {showArrow && seemore}
      </div>
      {renderPurchase()}
    </div>
  );
}

export default Show;
