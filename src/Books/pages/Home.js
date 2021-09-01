import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookDisplay from "../../shared/UI/BookCarousel";
import { fetchEBooks } from "../../store/book-action-creator";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart-action-creator";
import Loader from "../../shared/UI/Loader";

function Home(props) {
  const dispatch = useDispatch();
  const books = useSelector((state) => Object.values(state.books.list));
  const cartItem = useSelector((state) => state.cart.cartItem);
  const bookLoading = useSelector((state) => state.books.loading);

  useEffect(() => {
    dispatch(fetchEBooks(101901005));
  }, [dispatch]);

  if (bookLoading) {
    return <Loader />;
  }

  if (books) {
    return (
      <div className="container mt-lg">
        <BookDisplay
          books={books}
          title="best seller"
          addCart={addItemToCart}
          buttonText="add to cart"
          genreId={101901005}
          removeCart={removeItemFromCart}
          cartItem={cartItem}
        />
      </div>
    );
  }

  return null;
}

export default Home;
