import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSearch } from "../../store/book-action-creator";
import ShowList from "../main/ShowList";
import Loader from "../main/Loader";

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
    <div>
      <ShowList items={items} title={title} />
    </div>
  );
}

export default ShowSearch;
