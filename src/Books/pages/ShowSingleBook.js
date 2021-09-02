import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchEBook } from "../../store/book-action-creator";
import { addItemToCart } from "../../store/cart-action-creator";
import ShowBook from "../components/ShowBook";

function ShowItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = props.match.params;
  const item = useSelector((state) => state.books.list[id]);
  const mybooks = useSelector((state) => state.books.mybooks);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    dispatch(fetchEBook(id));
  }, [id, dispatch]);

  const onPurchaseClicked = () => {
    dispatch(addItemToCart(item));
    history.push("/checkout");
  };

  return (
    <div className="container">
      <ShowBook
        item={item}
        mybooks={mybooks}
        isSignedIn={isSignedIn}
        onPurchaseClicked={onPurchaseClicked}
      />
    </div>
  );
}

export default ShowItem;
