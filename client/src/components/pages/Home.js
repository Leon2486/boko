import React, { useEffect } from "react";
import { connect } from "react-redux";

import BookDisplay from "../main/BooksDisplay";
import { fetchEBooks, addCart, removeCart } from "../../actions";
import Loader from "../main/Loader";

function Home(props) {
  const { fetchEBooks, books, addCart, removeCart, cartItem, loading } = props;

  useEffect(() => {
    fetchEBooks(101901005);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (books) {
    return (
      <div className="container mt-lg">
        <BookDisplay
          books={books}
          title="best seller"
          addCart={addCart}
          buttonText="add to cart"
          genreId={101901005}
          removeCart={removeCart}
          cartItem={cartItem}
        />
      </div>
    );
  }

  return null;
}

const mapStateToProps = (state) => {
  return {
    books: Object.values(state.books.list),
    cartItem: state.cart.cartItem,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, {
  fetchEBooks,
  addCart,
  removeCart,
})(Home);
