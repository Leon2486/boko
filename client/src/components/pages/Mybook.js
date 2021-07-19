import React from "react";
import { connect } from "react-redux";

import CartButton from "../main/CartButton";

function Mybook(props) {
  const { mybooks } = props;

  const renderMyBook = () => {
    if (mybooks) {
      return mybooks.map((book) => {
        return (
          <div className="display__item" key={book.itemNumber}>
            <div className="display__link">
              <div className="display__item-imgbox">
                <img
                  src={book.largeImageUrl}
                  alt=""
                  className="display__item-img"
                />
              </div>
              <div className="title">{book.title}</div>
              <div className="author">{book.author}</div>
            </div>
            <CartButton Item={book} />
          </div>
        );
      });
    }
  };

  return (
    <div className="container">
      <div className="mybook">{renderMyBook()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { mybooks: Object.values(state.books.mybooks) };
};

export default connect(mapStateToProps)(Mybook);
