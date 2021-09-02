import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSearch } from "../../store/book-action-creator";
import BookList from "../components/BookList";
import Loader from "../../shared/UI/Loader";

function ShowSearch(props) {
  const dispatch = useDispatch();
  const items = useSelector((state) => Object.values(state.books.list));
  const title = new URLSearchParams(props.location.search).get("title");
  const bookLoading = useSelector((state) => state.books.loading);

  useEffect(() => {
    dispatch(fetchSearch(title));
  }, [title, dispatch]);

  if (bookLoading) {
    return <Loader />;
  }

  return (
    <div className="container mt-lg">
      <h2 className="heading2 mb-lg">search result of "{title}"</h2>
      <BookList items={items} />
    </div>
  );
}

export default ShowSearch;
